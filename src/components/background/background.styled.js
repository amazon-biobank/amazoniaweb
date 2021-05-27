import styled from 'styled-components';
import img from './amazonia.jpg';

export const StyledBackground = styled.div`
  background: url(${img}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  overflow-y: hidden;
  overflow-x: hidden;
`;
