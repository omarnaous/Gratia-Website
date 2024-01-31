import React from 'react'
import Navbar from '../Components/Navbar';
import CategoryGrid from './CategoryGrid';
import Banner from './Banner'; // Import the Banner component
import styled from 'styled-components';
import Footer from '../Components/Footer';
import { db } from '../firebase';
import { useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from 'react';

const Newhome = () => {
    const HomePageContainer = styled.div`
    margin-left: 10vw;
    margin-right: 10vw;

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

const [showContent, setShowContent] = useState(false);
const [bannerImage, setBannerImage] = useState(null);
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
    document.title = 'GRATIA - Home';
    fetchBanner();
  }, []);
  return (
   <HomePageContainer>
    <Navbar />
    {bannerImage ? <Banner bannerImage={bannerImage} /> : null}
    <CategoryGrid />
    <Footer />
  </HomePageContainer>
  )
}

export default Newhome