import React, { useState } from 'react';
import { Dialog, DialogContent, Typography } from '@mui/material';
import Navbar from '../Components/Navbar';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import styled from 'styled-components';
import {
  Button,
  Paper,
  TextField,
  Box,
  CircularProgress,
} from '@mui/material';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: calc(100%);
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 2vh;
  padding-bottom: 5vh;
`;

const textFieldStyle = {
  marginBottom: '16px',
  width: '300px',
};

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
    background-color: #333;
  }
`;

const SignInForm = ({ open, onClose, isSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    setLoading(true); // Start loading

    if (isSignIn) {
      await signInWithEmailAndPassword(auth, email, password);
      const successMessage = `You have signed in successfully as ${email}`;
      onclose();
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
  } finally {
    setLoading(false); // Stop loading, whether it was a success or an error
  }
};


  return (
    <div>
      <FormContainer>
        <h2
          style={{
            fontSize: '2rem',
            margin: '10px',
            marginBottom: '2vh',
          }}
        >
          SIGN IN
        </h2>
        <TextField
          label="Email"
          id="filled-basic"
          variant="filled"
          fullWidth
          style={textFieldStyle}
          value={email}
          onChange={handleEmailChange}
          required
        />

        <TextField
          label="Password"
          id="filled-basic"
          type="password"
          variant="filled"
          fullWidth
          style={textFieldStyle}
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <CustomButton type="submit" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Sign In'
          )}
        </CustomButton>
      </FormContainer>
    </div>
  );
};

export default SignInForm;
