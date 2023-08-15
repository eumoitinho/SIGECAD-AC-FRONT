import {styled} from 'styled-components';

export const HeaderContainer = styled.div`
  height: 40px;
  display: flex;
  background-image: linear-gradient(to right, #222, #222);
  background-size: 200%; /* Ajuste o valor conforme necessário */
  z-index: 9999;
`;

export const Container = styled.div`
max-width: 10000px;
margin: 0 auto;
padding: 20px;
background-color: #f5f5f5;
border-radius: 8px;
  `;

export const LogoContainer = styled.div`
  margin: 0 auto;
  margin-top: 10px;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: left;
  align-items: center;
`;

export const Logo = styled.div`
    height: 40px;
    padding-bottom: 0 !important;
    padding-top: 0 !important;
    background-color: #1b1b1b;
    background-image: -moz-linear-gradient(left, #749719, #1b1b1b);
    background-image: -webkit-gradient(linear, 0 0, 100% 0, from(#749719), to(#1b1b1b));
    background-image: -webkit-linear-gradient(left, #749719, #1b1b1b);
    background-image: -o-linear-gradient(left, #749719, #1b1b1b);
    background-image: linear-gradient(to right, #749719, #1b1b1b);
    background-repeat: repeat-x;
`;