import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import ResponsiveProductsGrid from "../Pages/grid";
import CategoryGrid from './CategoryGrid';
import Banner from './Banner'; // Import the Banner component
import styled, { keyframes } from 'styled-components';
import Footer from '../Components/Footer';
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";

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
`;

const Title = styled.h1`
  font-size: 5rem;
  color: black;
  animation: ${zoomAnimation} 3s forwards; /* Apply the zooming animation */
`;

const HomePage = () => {
  const [showContent, setShowContent] = useState(false);
  const [bannerImage, setBannerImage] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const fetchBanner = async () => {
    try {
      const docRef = doc(db, "Banner", "Banner");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data()["url"]);
        setBannerImage(docSnap.data()["url"]);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);


  const HomePageContainer = styled.div`
    margin-left: 7vw;
    margin-right: 7vw;

    @media only screen and (min-width: 320px) and (max-width: 479px){ 
      margin-left: 0vw;
      margin-right: 0vw;
     }

      @media only screen and (min-width: 480px) and (max-width: 767px){ 
      margin-left: 0vw;
      margin-right: 0vw;
       }

    @media only screen and (min-width: 768px) and (max-width: 991px){ 
      margin-left: 0vw;
      margin-right: 0vw;
       
     }

    
  `;
  
  

  return (
    <HomePageContainer >
      {!showContent ? (
        <FullScreenImage>
          <Title>GRATIA</Title>
        </FullScreenImage>
      ) : (
        <HomePageContainer>
          <Navbar />
          {bannerImage ? <Banner bannerImage={bannerImage} /> : null}
          <CategoryGrid />
          <Footer />
        </HomePageContainer>
      )}
    </HomePageContainer>
  );
};

export default HomePage;
