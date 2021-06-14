import React from 'react';

import {FloorContainer, FloorImage} from './styles';
const Floor = ({body, zindex = 1, ceeling}) => {
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;
  const x = body.position.x - width / 2;
  const y = body.position.y - height / 2;

  const imageInterations = Math.ceil(width / height);
  return (
    <FloorContainer
      top={y}
      left={x}
      width={width}
      height={height}
      zIndex={zindex}>
      {!ceeling && (
        <>
          {Array.apply(null, Array(imageInterations)).map((_, index) => (
            <FloorImage key={index} />
          ))}
        </>
      )}
    </FloorContainer>
  );
};

export default Floor;
