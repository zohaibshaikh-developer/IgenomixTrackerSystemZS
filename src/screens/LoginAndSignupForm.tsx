// LoginAndSignupForm.tsx
import { useState,useEffect, SetStateAction} from 'react';
import { useNavigate } from 'react-router-dom';

import * as Components from "../components/LoginAndSignup";
import '../App.css';
import LogoImage from '../assets/IGENOMIX_PartOfVitrolifeGroup_black.png';
import VideoSource from '../assets/genetic_video.mp4';
import BASE_URL from '../config/base_url';
import React from 'react';

const LoginAndSignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [signIn, toggle] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);


  
  const handleSignIn = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/loginUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.status === 200) {
        console.log(result.message); // "Login successful"
        setErrorMessage(null); // Clear any previous error message
        navigate('/dashboard');
      } else if (response.status === 401) {
        console.log(result.message); // "Username not found" or "Password is incorrect"
        setErrorMessage(result.message); // Set the error message for rendering
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setErrorMessage('An error occurred during sign-in. Please try again.'); // Set a generic error message
    }
  };


  const handleSignUp = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/registerUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          name,
          contactNumber,
          email,
        }),
      });

      const result = await response.json();

      if (response.status === 200) {
        console.log(result.message); // "Registration successful"
        setErrorMessage(null); // Clear any previous error message
        setRegistrationSuccess(true); // Set registration success flag

      } else {
        console.log(result.message); // Handle other status codes or error messages
        setErrorMessage(result.message); // Set the error message for rendering
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setErrorMessage('An error occurred during sign-up. Please try again.'); // Set a generic error message
    }
  };



  useEffect(() => {
    if (registrationSuccess) {
      toggle(true);
    }
  }, [registrationSuccess]);


  return (
    <>
      <Components.VideoBackground autoPlay loop muted>
        <source src={VideoSource} type="video/mp4" />
      </Components.VideoBackground>
      <Components.Container>
        <Components.SignUpContainer signingIn={signIn}>
          <Components.Form>
            <Components.TitleMain>Create Account</Components.TitleMain>
            <Components.Input
              type="text"
              name="Name"
              placeholder="Name"
              value={name}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setName(e.target.value)}
            />
            <Components.Input
              type="email"
              name="Email"
              placeholder="Email"
              value={email}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
            />
            <Components.Input
              type="text"
              name="ContactNo"
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setContactNumber(e.target.value)}
            />
            <Components.Input
              type="text"
              name="Username"
              placeholder="Username"
              value={username}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setUsername(e.target.value)}
            />
            <Components.Input
              type={showPassword ? "text" : "password"}
              name="PasswordRegister"
              placeholder="Password"
              value={password}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
            />
            <span
            style={{ cursor: 'pointer' ,color:'black', alignSelf: 'flex-end' , backgroundColor: '#6EF3D6', padding: '0.6%', fontWeight: 'bold' , borderRadius: '6%', fontSize: '85%'}}
            onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'} Password
            </span>
            {errorMessage && (
            <span style={{ color: 'red', margin: '10px 0', display: 'block' }}>
              {errorMessage}
            </span>
          )}
            <Components.Button onClick={handleSignUp}>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signingIn={signIn}>
          <Components.Form>
            <Components.TitleMain>Sign in</Components.TitleMain>
            {/* {flashMessage && <SuccessFlashMessage message={flashMessage} onClose={closeFlashMessage} />} */}

            {registrationSuccess && (
            <span style={{ color: 'green', margin: '10px 0', display: 'block', fontSize: '18px' }}>
              Registration successful! Please sign in.
            </span>
          )}
            <Components.Input
              type="text"
              name="Username"
              placeholder="Username"
              value={username}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setUsername(e.target.value)}
            />
            <Components.Input
            type={showPassword ? "text" : "password"}
            name="Password"
            placeholder="Password"
            value={password}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
          />
          <span
            style={{ cursor: 'pointer' ,color:'black', alignSelf: 'flex-end' , backgroundColor: '#6EF3D6', padding: '0.6%', fontWeight: 'bold' , borderRadius: '6%', fontSize: '85%'}}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'} Password
          </span>
          {errorMessage && (
            <span style={{ color: 'red', margin: '10px 0', display: 'block' }}>
              {errorMessage}
            </span>
          )}
            <Components.Button onClick={handleSignIn}>Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer signingIn={signIn}>
          <Components.Overlay signingIn={signIn}>
            <Components.LeftOverlayPanel signingIn={signIn}>
              <Components.Logo src={LogoImage} alt="Logo" draggable={false} onContextMenu={(e: { preventDefault: () => any; }) => e.preventDefault()} />
              <Components.Title>Welcome Back to Igenomix Tracking System</Components.Title>
              <Components.Paragraph>
                To stay connected with us and access your account, please log in with your personal information.
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signingIn={signIn}>
              <Components.Logo src={LogoImage} alt="Logo" draggable={false} onContextMenu={(e: { preventDefault: () => any; }) => e.preventDefault()} />
              <Components.Title>Welcome to Igenomix Tracking System</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start the journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </>
  );
}

export default LoginAndSignupForm;
