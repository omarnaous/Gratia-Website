import React, { useState } from 'react';
import { Dialog, DialogContent, Button, Typography, Box } from '@mui/material';
import Navbar from '../Components/Navbar';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import styled from 'styled-components'; // Import styled-components
import ReusableTextField from '../Components/CustomTextfield'; // Import your custom ReusableTextField component

// Create a styled component for the form container
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 40vh;
  width: 60vw;
  max-width: 100%; /* Adjust the width as needed */
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 5vh;
  padding-bottom: 5vh;
`;

const SignInForm = ({ open, onClose, isSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      if (isSignIn) {
        await signInWithEmailAndPassword(auth, email, password);
        const successMessage = `You have signed in successfully as ${email}`;
        window.alert(successMessage);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        const successMessage = `You have registered successfully as ${email}`;
        window.alert(successMessage);
      }
      setError(null);
      console.log(`Email: ${email}, Password: ${password}`);
  
      // Close the dialog after successful sign-up/sign-in
      onClose();
    } catch (error) {
      setError(error.message);
  
      // Show an alert on error
      alert(error.message);
    }
  };;

  const buttonStyle = {
    backgroundColor: 'black',
    color: 'white',
    marginTop: '5px',
  };

  return (
    <div>
      <FormContainer>
        <Typography variant="h4" align="center" gutterBottom>
          {isSignIn ? "Sign In":"Register"}
        </Typography>
        <ReusableTextField
          id="email"
          label="Email"
          color="black"
          fullWidth
          onChange={handleEmailChange}
          value={email}
        />
        <ReusableTextField
          id="password"
          label="Password"
          color="black"
          fullWidth
          type="password"
          onChange={handlePasswordChange}
          value={password}
        />
        <Button
          type="submit"
          variant="contained"
          sx={buttonStyle}
          fullWidth
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </FormContainer>
    </div>
  );
};

export default SignInForm;
