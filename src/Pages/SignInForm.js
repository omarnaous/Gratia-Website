import React, { useState } from 'react';
import { Dialog, DialogContent, Typography } from '@mui/material';
import Navbar from '../Components/Navbar';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import styled from 'styled-components'; // Import styled-components
import ReusableTextField from '../Components/CustomTextfield'; // Import your custom ReusableTextField component

// Create a styled component for the form container
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* height: 40vh; */
  width: calc(100%);
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 5vh;
  padding-bottom: 5vh;
`;

// Create a styled component for the custom button
const CustomButton = styled.button`
  background-color: black;
  color: white;
  margin-top: 5px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
  width: 50%;
  font-size: 1.3rem;

  &:hover {
    background-color: #333; // Change the background color on hover
  }
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
  };

  return (
    <div>
      <FormContainer>
        <Typography variant="h4" align="center" gutterBottom>
          {isSignIn ? 'Sign In' : 'Register'}
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
        {/* Replace the Button component with the custom button */}
        <CustomButton type="submit" onClick={handleSubmit}>
          Sign In
        </CustomButton>
      </FormContainer>
    </div>
  );
};

export default SignInForm;
