import styled from 'styled-components';
import {IMAGE_BACKGROUND_FLOOR} from '../../constants/images';

export const FloorContainer = styled.View`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
  overflow: hidden;
  position: absolute;
  top: ${({top}) => top}px;
  left: ${({left}) => left}px;
  z-index: ${({zIndex}) => zIndex};
  background: transparent;
  flex-direction: row;
`;

export const FloorImage = styled.Image.attrs({
  resizeMode: 'stretch',
  source: IMAGE_BACKGROUND_FLOOR,
})`
  position: absolute;
  width: 100%;
  height: 100%;
`;
