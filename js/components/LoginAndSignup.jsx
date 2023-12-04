import styled from "@emotion/styled";
export const Container = styled.div `
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
export const VideoBackground = styled.video `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; /* Place the video behind other elements */
`;
export const Logo = styled.img `
  width: 100%;
  max-height: 5.5vw; /* Set the maximum height for the logo as a percentage of the viewport width */
  object-fit: contain; /* Ensure the logo retains its aspect ratio */
  margin-bottom: 2vw; /* Adjust the margin as a percentage of the viewport width */
  margin-top: -4vw; /* Adjust the margin as a percentage of the viewport width */
  user-drag: element; /* Enable dragging */
  user-select: none; /* Disable text selection on drag */

  @media (max-width: 767px) {
    max-height: 7.8vw; /* Adjust the maximum height for smaller screens */
    margin-bottom: 6vw; /* Adjust the margin for smaller screens */
    margin-top: -3vw; /* Adjust the margin for smaller screens */
  }
`;
export const SignUpContainer = styled.div `
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) => props.signingIn !== true
    ? `
  transform: translateX(100%);
	opacity: 1;
	z-index: 5;
	`
    : null}
`;
export const SignInContainer = styled.div `
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) => (props.signingIn !== true ? `transform: translateX(100%);` : null)}
`;
export const Form = styled.form `
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 10%;
  height: 100%;
  text-align: center;
`;
export const Title = styled.h1 `
  font-weight: bold;
  margin: 0;
  text-shadow: 1px 1px 1px #000; /* Add a black shadow for a 3D effect */
  padding: 0 10px;
  font-size: 2.96vw; /* Set font size to 5% of the viewport width */

  @media (max-width: 767px) {
    font-size: 6.45vw; /* Adjust font size for smaller screens */
  }
`;
export const TitleMain = styled.h1 `
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
export const Input = styled.input `
  background-color: #eee;
  border: none;
  padding: 1vw 1vw; /* Set padding as a percentage of the viewport width */
  margin: 1vw 0; /* Set margin as a percentage of the viewport width */
  width: 100%;
  color: #000;
  font-weight: 600;

  @media (max-width: 767px) {
    /* Adjust the padding and margin for smaller screens */
    padding: 2vw 2vw;
    margin: 3vw 0;
  }
`;
export const Button = styled.button `
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
export const GhostButton = styled(Button) `
  background-color: transparent;
  border-color: #ffffff;
`;
export const Anchor = styled.a `
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;
export const OverlayContainer = styled.div `
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) => props.signingIn !== true ? `transform: translateX(-100%);` : null}
`;
export const Overlay = styled.div `
  background: #0DCEDA;
  background: -webkit-linear-gradient(to right, #6EF3D6, #0DCEDA);
  background: linear-gradient(to right, #6EF3D6, #0DCEDA);
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
export const OverlayPanel = styled.div `
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
export const LeftOverlayPanel = styled(OverlayPanel) `
  transform: translateX(-20%);
  ${(props) => (props.signingIn !== true ? `transform: translateX(0);` : null)}
`;
export const RightOverlayPanel = styled(OverlayPanel) `
  right: 0;
  transform: translateX(0);
  ${(props) => (props.signingIn !== true ? `transform: translateX(20%);` : null)}
`;
export const Paragraph = styled.p `
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
