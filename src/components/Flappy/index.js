import React from 'react';
import {Animated} from 'react-native';
import {FLAPS} from '../../constants/images';

import {FlappyImage} from './styles';
const AnimatedFlappyImage = Animated.createAnimatedComponent(FlappyImage);

const Flappy = ({body, pose}) => {
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  const flappyAnimated = new Animated.Value(body.velocity.y);
  flappyAnimated.setValue(body.velocity.y);

  let animationRotation = flappyAnimated.interpolate({
    inputRange: [-10, 0, 10, 20],
    outputRange: ['-20deg', '0deg', '15deg', '45deg'],
    extrapolate: 'clamp',
  });

  let imageSource = FLAPS['ImageFlap' + pose];

  return (
    <AnimatedFlappyImage
      source={imageSource}
      top={y}
      left={x}
      width={width}
      height={height}
      resizeMode="contain"
      style={[{transform: [{rotate: animationRotation}]}]}
    />
  );
};

export default Flappy;
