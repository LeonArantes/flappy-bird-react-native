import styled from 'styled-components';

export const ContainerPipe = styled.View`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
  top: ${({top}) => top}px;
  left: ${({left}) => left}px;
  overflow: hidden;
  flex-direction: column;
  position: absolute;
`;

export const ImagePipe = styled.Image`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
`;
