import React, {useState, useRef} from 'react';
import {GameEngine} from 'react-native-game-engine';
import Matter from 'matter-js';

import {MAX_WIDTH, MAX_HEIGHT, FLAP_WIDTH, FLAP_HEIGHT} from '../../constants';
import Flappy from '../../components/Flappy';
import Physics from '../../components/Physics';
import Floor from '../../components/Floor';

import {
  ContainerGame,
  ContainerOnBoarding,
  OnBoardingImage,
  ScoreWrapper,
  ScoreCounter,
  GameOverContainer,
  GameOverLabel,
  GamerOverCardScore,
  GameOverScoreLabel,
  GameOverScoreValue,
  GameBackground,
  GameOverWrapperAux,
  GameOverMedalLabel,
  GameOverWrapperMedal,
} from './styles';

import Store from '../../store';
import SoundPlayer from 'react-native-sound-player';

import * as Animatable from 'react-native-animatable';
const AnimatableGamerOverCardScore =
  Animatable.createAnimatableComponent(GamerOverCardScore);

const AnimatableGameOverLabel =
  Animatable.createAnimatableComponent(GameOverLabel);

const GameScreen = () => {
  const gameEngineRef = useRef();
  const [runningGame, setRunningGame] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  generateWorld = () => {
    let engine = Matter.Engine.create({enableSleeping: false});
    let world = engine.world;
    world.gravity.y = 0;

    let flappy = Matter.Bodies.rectangle(
      MAX_WIDTH / 2,
      MAX_HEIGHT / 2,
      FLAP_WIDTH,
      FLAP_HEIGHT,
    );
    flappy.restitution = 20;

    let safeAreaTop = Matter.Bodies.rectangle(
      MAX_WIDTH / 2,
      25,
      MAX_WIDTH,
      50,
      {isStatic: true},
    );

    let safeAreaBottom = Matter.Bodies.rectangle(
      MAX_WIDTH / 2,
      MAX_HEIGHT - 25,
      MAX_WIDTH,
      50,
      {isStatic: true},
    );

    let safeAreaBottom1 = Matter.Bodies.rectangle(
      MAX_WIDTH + MAX_WIDTH / 2,
      MAX_HEIGHT - 25,
      MAX_WIDTH + 4,
      50,
      {isStatic: true},
    );

    Matter.World.add(world, [
      flappy,
      safeAreaTop,
      safeAreaBottom,
      safeAreaBottom1,
    ]);

    Matter.Events.on(engine, 'collisionStart', event => {
      gameEngineRef.current.dispatch({type: 'GAME_OVER'});
    });

    return {
      physics: {
        engine: engine,
        world: world,
      },
      flappy: {
        body: flappy,
        pose: 1,
        renderer: Flappy,
      },
      safeAreaTop: {
        body: safeAreaTop,
        renderer: Floor,
        ceeling: true,
      },
      safeAreaBottom: {
        body: safeAreaBottom,
        renderer: Floor,
      },
      safeAreaBottom1: {
        body: safeAreaBottom1,
        renderer: Floor,
      },
    };
  };

  startTheGame = () => {
    setRunningGame(true);
    setGameOver(false);
    setScore(0);
  };

  restartTheGame = () => {
    gameEngineRef.current.swap(generateWorld());
    setGameOver(false);
    setScore(0);
  };

  getBestScore = async () => {
    const responseBestScore = (await Store.get('bestScore')) || 0;
    if (score <= responseBestScore) {
      setBestScore(responseBestScore);
    } else {
      await Store.set('bestScore', score);
      setBestScore(score);
    }
    // await Store.reset();
  };

  listenEvents = event => {
    switch (event.type) {
      case 'SCORE':
        setScore(score + 1);
        SoundPlayer.addEventListener('FinishedLoadingURL', () =>
          SoundPlayer.play(),
        );
        SoundPlayer.loadUrl(
          'https://www.myinstants.com/media/sounds/sfx_point.mp3',
        );
        break;
      case 'GAME_OVER':
        getBestScore();
        setRunningGame(false);
        setGameOver(true);
        SoundPlayer.addEventListener('FinishedLoadingURL', () =>
          SoundPlayer.play(),
        );
        SoundPlayer.loadUrl(
          'https://www.myinstants.com/media/sounds/punch_Lxw1hm2.mp3',
        );
        break;
      default:
        return;
    }
  };

  return (
    <ContainerGame onPress={() => !gameOver && !runningGame && startTheGame()}>
      <GameBackground />
      <>
        {!runningGame && !gameOver && (
          <ContainerOnBoarding>
            <OnBoardingImage />
          </ContainerOnBoarding>
        )}

        {runningGame && (
          <ScoreWrapper>
            <ScoreCounter>{score}</ScoreCounter>
          </ScoreWrapper>
        )}

        <GameEngine
          style={styles.game}
          ref={gameEngineRef}
          running={runningGame}
          systems={[Physics]}
          entities={generateWorld()}
          onEvent={listenEvents}
        />

        {!runningGame && gameOver && (
          <GameOverContainer onPress={() => restartTheGame()}>
            <AnimatableGameOverLabel
              animation="bounceIn"
              duration={200}
              useNativeDriver={true}
              easing="ease-out">
              Game Over
            </AnimatableGameOverLabel>
            <AnimatableGamerOverCardScore
              animation="bounceIn"
              duration={200}
              useNativeDriver={true}
              easing="ease-out">
              <GameOverWrapperAux>
                <GameOverMedalLabel>Medal</GameOverMedalLabel>
                <GameOverWrapperMedal score={score} />
              </GameOverWrapperAux>
              <GameOverWrapperAux>
                <GameOverScoreLabel>Score</GameOverScoreLabel>
                <GameOverScoreValue>{score}</GameOverScoreValue>
                <GameOverScoreLabel mt="20px">Best</GameOverScoreLabel>
                <GameOverScoreValue>{bestScore}</GameOverScoreValue>
              </GameOverWrapperAux>
            </AnimatableGamerOverCardScore>
          </GameOverContainer>
        )}
      </>
    </ContainerGame>
  );
};

export default GameScreen;

const styles = {
  game: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
};
