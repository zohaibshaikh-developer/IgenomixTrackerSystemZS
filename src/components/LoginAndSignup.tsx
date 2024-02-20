// Components.tsx
import React, { InputHTMLAttributes, ButtonHTMLAttributes, ImgHTMLAttributes } from 'react';
import styled from "@emotion/styled";


interface ContainerProps {
  // Add any additional props if needed
}

export const Container: React.FC<ContainerProps> = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 85vw; /* Set width to 50% of the viewport width */
  max-width: 90%; /* Set a maximum width (adjust as needed) */
  min-height: 80vh; /* Set minimum height to 50% of the viewport height */
  margin: auto; /* Center the container horizontally */
  padding: 0 2.5%;
`;




export const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; /* Place the video behind other elements */
`;

interface LogoProps extends ImgHTMLAttributes<HTMLImageElement> {
  // Add any additional props if needed
}

export const Logo: React.FC<LogoProps> = styled.img<LogoProps>`
  width: 100%;
  max-height: 5.5vw;
  object-fit: contain;
  margin-bottom: 2vw;
  margin-top: -4vw;
  user-drag: element;
  user-select: none;

  @media (max-width: 767px) {
    max-height: 7.8vw;
    margin-bottom: 6vw;
    margin-top: -3vw;
  }
`;


interface SignUpContainerProps {
  signingIn: boolean;
}

export const SignUpContainer = styled.div<SignUpContainerProps>`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    props.signingIn !== true
      ? `
  transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	`
      : null}
`;

interface SignInContainerProps {
  signingIn: boolean;
}

export const SignInContainer = styled.div<SignInContainerProps>`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) => (props.signingIn !== true ? `transform: translateX(100%);` : null)}
`;

interface FormProps {
  // Add any additional props if needed
}

export const Form: React.FC<FormProps> = styled.form`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 10%;
  height: 100%;
  text-align: center;
`;

interface TitleProps {
  // Add any additional props if needed
}

export const Title: React.FC<TitleProps> = styled.h1`
  font-weight: bold;
  margin: 0;
  text-shadow: 1px 1px 1px #000; /* Add a black shadow for a 3D effect */
  padding: 0 10px;
  font-size: 2.96vw; /* Set font size to 5% of the viewport width */

  @media (max-width: 767px) {
    font-size: 6.45vw; /* Adjust font size for smaller screens */
  }
`;

interface TitleMainProps {
  // Add any additional props if needed
}

export const TitleMain: React.FC<TitleMainProps> = styled.h1`
  font-weight: bold;
  margin: 0;
  color:#518098;
  margin-bottom: 4%;
  text-shadow: 0.4px 0.4px 0.4px #000; /* Add a black shadow for a 3D effect */
  font-size: 3.25vw; /* Set font size to 5% of the viewport width */

  @media (max-width: 767px) {
    font-size: 7.5vw; /* Adjust font size for smaller screens */
  }

`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // Add any additional custom props you might need
}

export const Input: React.FC<InputProps> = styled.input<InputProps>`
  background-color: #eee;
  border: none;
  padding: 1vw 1vw;
  margin: 1vw 0;
  width: 100%;
  color: #000;
  font-weight: 600;

  @media (max-width: 767px) {
    padding: 2vw 2vw;
    margin: 3vw 0;
  }
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Add any additional props if needed
}


export const Button: React.FC<ButtonProps> = styled.button<ButtonProps>`
  border-radius: 20px;
  border: 1px solid #6EF3D6;
  background-color: #0DCEDA;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 2%;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;

interface GhostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Add any additional props if needed
}

export const GhostButton: React.FC<GhostButtonProps> = ({ children, ...props }) => (
  <StyledGhostButton {...props}>
    {children}
  </StyledGhostButton>
);

const StyledGhostButton = styled.button<GhostButtonProps>`
  background-color: transparent;
  border-color: #ffffff;
  /* Add any other styling you need */
`;

// export default GhostButton;

interface AnchorProps {
  // Add any additional props if needed
}

export const Anchor: React.FC<AnchorProps> = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

interface OverlayContainerProps {
  signingIn: boolean;
}

export const OverlayContainer = styled.div<OverlayContainerProps>`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) =>
    props.signingIn !== true ? `transform: translateX(-100%);` : null}
`;

interface OverlayProps {
  signingIn: boolean;
}

export const Overlay = styled.div<OverlayProps>`
  background: #3d596d;
  // background: -webkit-linear-gradient(to right, #6EF3D6, #0DCEDA);
  // background: linear-gradient(to right, #6EF3D6, #0DCEDA);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) => (props.signingIn !== true ? `transform: translateX(50%);` : null)}
`;

interface OverlayPanelProps {
  // Add any additional props if needed
}

export const OverlayPanel = styled.div<OverlayPanelProps>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
//   padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

interface LeftOverlayPanelProps {
  signingIn: boolean;
}

export const LeftOverlayPanel = styled(OverlayPanel) <LeftOverlayPanelProps>`
  transform: translateX(-20%);
  ${(props) => (props.signingIn !== true ? `transform: translateX(0);` : null)}
`;

interface RightOverlayPanelProps {
  signingIn: boolean;
}

export const RightOverlayPanel = styled(OverlayPanel) <RightOverlayPanelProps>`
  right: 0;
  transform: translateX(0);
  ${(props) => (props.signingIn !== true ? `transform: translateX(20%);` : null)}
`;

interface ParagraphProps {
  // Add any additional props if needed
}

export const Paragraph: React.FC<ParagraphProps> = styled.p`
  font-weight: 500;
  line-height: 140%;
  letter-spacing: 0.5px;
  margin: 22px 0 30px;
  padding: 0 10px;
  text-shadow: 0.7px 0.7px 0.7px #000; /* Add a black shadow for a 3D effect */

  font-size: 1.05vw; /* Set font size to 5% of the viewport width */

  @media (max-width: 767px) {
    font-size: 3.5vw; /* Adjust font size for smaller screens */
  }
`;
