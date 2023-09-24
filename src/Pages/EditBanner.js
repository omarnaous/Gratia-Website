import React, { useEffect, useState } from 'react';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  doc,
  setDoc,
} from 'firebase/firestore'; // Import Firestore functions for adding data

import Navbar from '../Components/Navbar';
import ImageSelectionPage from '../Components/ImageSelection';

const AnotherPage = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Initialize Firebase Storage
  const storage = getStorage();


  // Function to handle image selection
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setSelectedImages(selectedImages);

    const previews = selectedImages.map((image) =>
      URL.createObjectURL(image)
    );
    setImagePreviews(previews);
  };

  // Function to handle image reset
  const handleImageReset = () => {
    setSelectedImages([]);
    setImagePreviews([]);
  };

  // Function to upload images to Firebase Storage and return their download URLs
  const uploadImagesToStorage = async () => {
    const uploadedImageUrls = "";

    for (const image of selectedImages) {
      try {
        const storageRef = ref(storage, `images/${image.name}`);
        const snapshot = await uploadBytesResumable(storageRef, image);
        const downloadURL = await getDownloadURL(snapshot.ref);
        uploadedImageUrls = downloadURL
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    return uploadedImageUrls;
  };

  // Function to set image URLs to Firestore
  const setImageUrlsToFirestore = async (uploadedUrls) => {
    try {
      const productRef = doc(db, 'Banner', "Banner"); // Assuming you have a "products" collection
      await setDoc(
        productRef,
        {
          imageUrls: uploadedUrls, // Replace with your Firestore field name
        },
        { merge: true }
      );
    } catch (error) {
      console.error('Error setting image URLs to Firestore:', error);
    }
  };

  // Handle image upload and set URLs to Firestore
  const handleImageUpload = async () => {
    const uploadedUrls = await uploadImagesToStorage();
    setImageUrlsToFirestore(uploadedUrls);
  };

  return (
    <div>
      <Navbar></Navbar>
      <ImageSelectionPage
        categoryData={categoryData}
        handleImageChange={handleImageChange}
        handleImageReset={handleImageReset}
      />
      {/* Add a button or any UI element to trigger image upload */}
      <button onClick={handleImageUpload}>Upload Images</button>
    </div>
  );
};

export default AnotherPage;
