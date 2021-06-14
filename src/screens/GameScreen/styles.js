import styled from 'styled-components';
import {
  IMAGE_BACKGROUND_GAME,
  GOLD_MEDAL,
  SILVER_MEDAL,
  BRONZE_MEDAL,
  IMAGE_ONBOARDING,
} from '../../constants/images';

export const ContainerGame = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  flex: 1;
  background: #f1f1f1;
`;

export const ContainerOnBoarding = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999999;
  align-items: center;
  justify-content: center;
`;

export const OnBoardingImage = styled.Image.attrs({
  resizeMode: 'contain',
  source: IMAGE_ONBOARDING,
})`
  width: 70%;
`;

export const ScoreWrapper = styled.View`
  width: 100%;
  position: absolute;
  top: 60px;
  z-index: 1;
`;

export const ScoreCounter = styled.Text`
  color: white;
  text-align: center;
  font-size: 60px;
  font-family: '04b_19';
  text-shadow: 3px 3px 2px #000;
`;

export const GameBackground = styled.Image.attrs({
  resizeMode: 'stretch',
  source: IMAGE_BACKGROUND_GAME,
})`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const GameOverContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: #00000090;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

export const GameOverLabel = styled.Text`
  font-weight: bold;
  font-size: 55px;
  color: #fff;
  font-family: '04b_19';
  text-shadow: 3px 3px 2px #000;
`;

export const GamerOverCardScore = styled.View`
  width: 80%;
  height: 200px;
  background: #b4a658;
  margin-top: 20px;
  border-radius: 12px;
  padding: 20px;
  border: 3px solid #00000090;
  margin-top: 20px;
  flex-direction: row;
`;

export const GameOverWrapperAux = styled.View`
  width: 50%;
  height: 100%;
  justify-content: center;
`;

export const GameOverWrapperMedal = styled.Image.attrs(({score}) => ({
  resizeMode: 'cover',
  source: score > 5 ? GOLD_MEDAL : score < 2 ? BRONZE_MEDAL : SILVER_MEDAL,
}))`
  width: 100px;
  height: 100px;
  /* background: #c9c278; */
  border-radius: 100px;
`;

export const GameOverMedalLabel = styled.Text`
  color: #fff;
  text-shadow: 2px 2px 2px #000;
  text-align: left;
  font-size: 25px;
  font-family: '04b_19';
  bottom: 10px;
`;

export const GameOverScoreWrapper = styled.View``;

export const GameOverScoreLabel = styled.Text`
  color: #fff;
  text-shadow: 2px 2px 2px #000;
  text-align: right;
  font-size: 25px;
  font-family: '04b_19';
  margin-top: ${({mt = 0}) => mt};
`;

export const GameOverScoreValue = styled.Text`
  color: white;
  text-align: right;
  font-size: 20px;
  font-family: '04b_19';
  font-size: 35px;
  text-shadow: 2px 2px 2px #000;
  margin-top: 4px;
`;
