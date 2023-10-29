import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import ResponsiveProductsGrid from "../Pages/grid";
import CategoryGrid from './CategoryGrid';
import styled, { keyframes } from 'styled-components';
import Footer from '../Components/Footer';
import Banner from './Banner';

// Keyframes for zooming animation
const zoomAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(0.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const FullScreenImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url('https://firebasestorage.googleapis.com/v0/b/gratiaonline-6cbfe.appspot.com/o/illusion.jpeg?alt=media&token=19aa8343-732f-4be0-a7cc-799aa7bf0f70');
  background-size: cover; /* Use cover to make the image cover the entire viewport */
  background-position: center; /* Center the image */
  display: flex;
  justify-content: center;
  align-items: center;
  
  `

const Title = styled.h1`
  font-size: 5rem;
  color: black;
  animation: ${zoomAnimation} 3s forwards; /* Apply the zooming animation */
`;

const HomePage = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div style={{marginLeft:"10vw", marginRight:"10vw"}}>
      {!showContent ? (
        <FullScreenImage>
          <Title>GRATIA</Title>
        </FullScreenImage>
      ) : (
        <div>
          <Navbar />
          <Banner />
          <CategoryGrid />
          <Footer />

        </div>
      )}
    </div>
  );
};

export default HomePage;
