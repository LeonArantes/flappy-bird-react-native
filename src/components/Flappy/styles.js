import styled from 'styled-components';

export const FlappyImage = styled.Image`
  position: absolute;
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
  top: ${({top}) => top}px;
  left: ${({left}) => left}px;
  border-radius: 20px;
`;
