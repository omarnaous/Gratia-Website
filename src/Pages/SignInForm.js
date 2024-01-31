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

const SignInForm = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleToggleMode = () => {
    setIsSignIn(!isSignIn);
    setError(null);
    setEmail(''); // Clear email field when switching modes
    setPassword(''); // Clear password field when switching modes
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true); // Start loading

      if (isSignIn) {
        await signInWithEmailAndPassword(auth, email, password);
        const successMessage = `You have signed in successfully as ${email}`;
        onClose();
        window.alert(successMessage);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        const successMessage = `You have registered successfully as ${email}`;
        window.alert(successMessage);
        setIsSignIn(true); 
        onClose();
      }
      setError(null);
      onClose();
    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false); // Stop loading, whether it was a success or an error
      onClose();
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
          {isSignIn ? 'SIGN IN' : 'REGISTER'}
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
            isSignIn ? 'Sign In' : 'Register'
          )}
        </CustomButton>

        <Typography variant="body2" color="primary" style={{ cursor: 'pointer', marginTop:"20px" ,color:"black" }} onClick={handleToggleMode}>
          {isSignIn ? 'Don\'t have an account? Register here.' : 'Already have an account? Sign in here.'}
        </Typography>

        
      </FormContainer>
    </div>
  );
};

export default SignInForm;
