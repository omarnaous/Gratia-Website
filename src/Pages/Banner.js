import React from 'react'
import styled from 'styled-components'
import { useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import { useState } from 'react';
import { BannerContainer } from '../Styles/BannerStyle';

const Banner = () => {
const [BannerImage,setBannerImage] = useState("");

  useEffect(() => {
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
  
    fetchBanner(); // Call the fetchData function when the component mounts
  }, []);
  return (
    <BannerContainer>
        <img src={BannerImage} alt="" />
    </BannerContainer>
  )
}

export default Banner