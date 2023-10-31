import React, { useState } from 'react';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { db } from '../firebase';
import styled from 'styled-components';
import { Button, CircularProgress, Box } from '@mui/material';
import {
  doc,
  setDoc,
} from 'firebase/firestore'; // Import Firestore functions for updating data

import Navbar from '../Components/Navbar';
import ImageSelectionPage from '../Components/ImageSelection';

const MyBannerEdit = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Firebase Storage
  const storage = getStorage();

  const buttonStyle = {
    marginBottom: '16px',
    backgroundColor: 'black',
  };


  const imagesContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
  }

  const imageStyle = {
    width: '100px',
    height: '100px',
    marginTop: '10px', // Add margin to separate the image from the button
  };

  // Function to handle image selection
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      setSelectedImage(image);
      setImagePreview(URL.createObjectURL(image));
    }
  };

  // Function to handle image reset
  const handleImageReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  // Function to upload the selected image to Firebase Storage
  const uploadImageToStorage = async () => {
    if (selectedImage) {
      try {
        setIsLoading(true);
        const storageRef = ref(storage, `images/${selectedImage.name}`);
        const snapshot = await uploadBytesResumable(storageRef, selectedImage);
        const downloadURL = await getDownloadURL(snapshot.ref);
        setIsLoading(false);
        return downloadURL;
      } catch (error) {
        console.error('Error uploading image:', error);
        setIsLoading(false);
        return null;
      }
    }
    return null;
  };

  // Function to update the banner with the new image URL
  const updateBanner = async (imageURL) => {
    if (imageURL) {
      try {
        const bannerRef = doc(db, 'Banner', "Banner"); // Assuming you have a "Banner" document
        await setDoc(
          bannerRef,
          {
            url: imageURL, // Replace with your Firestore field name
          },
          { merge: true }
        );
        alert('Banner edited successfully!');
      } catch (error) {
        console.error('Error updating banner:', error);
      }
    }
  };

  // Handle image upload and banner update
  const handleImageUpload = async () => {
    const imageURL = await uploadImageToStorage();
    updateBanner(imageURL);
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
    width: 100%;

    &:hover {
      background-color: #333;
    }
  `;

  

  return (
    <div style={{ margin: "20px", width:"300px" }}>
      <h1 style={{ textAlign: 'center', margin: "10px" }}>Edit Banner</h1>

      <ImageSelectionPage
      // Include relevant props if needed
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{
          marginBottom: "20px"
        }}
      />

      {selectedImage && (
        <div style={imagesContainerStyle}>
           <img
          src={imagePreview}
          alt="Selected Image"
          style={imageStyle}
        />
        </div>
       
      )}

      <CustomButton type="submit" onClick={handleImageUpload} disabled={isLoading}>
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Add Product'
        )}
      </CustomButton>
    </div>
  );
};

export default MyBannerEdit;
