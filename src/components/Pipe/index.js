import React from 'react';
import {View, Image} from 'react-native';
import {PIPES} from '../../constants/images';

import {ContainerPipe, ImagePipe} from './styles';

const Pipe = ({body}) => {
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  const pipeRation = 160 / width;
  const pipeHeight = 33 * pipeRation;
  const pipeIterations = Math.ceil(height / pipeHeight);

  return (
    <ContainerPipe top={y} left={x} width={width} height={height}>
      {Array.apply(null, Array(pipeIterations)).map((_, index) => (
        <ImagePipe
          resizeMode={'stretch'}
          key={index}
          width={width}
          height={pipeHeight}
          source={PIPES.ImagePipeBody}
        />
      ))}
    </ContainerPipe>
  );
};

export default Pipe;
