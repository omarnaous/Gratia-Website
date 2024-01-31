import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from '@mui/material';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ImageSelectionPage = ({ open, handleClose }) => {
  const buttonStyle = {
    marginBottom: '16px',
  };
  const imagePreviewStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '5px',
    objectFit: 'cover',
  };

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [resetImagesVisible, setResetImagesVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading indicator state
  const [isUploadComplete, setIsUploadComplete] = useState(false); // Upload completion state

  const imagesContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    marginBottom: '16px',
  };

  const storage = getStorage(); // Get Firebase Storage reference

  const handleImageChange = async (e) => {
    const selectedImage = e.target.files[0]; // Only select the first image
    if (!selectedImage) {
      return;
    }

    setIsLoading(true); // Start loading indicator

    try {
      setImages([selectedImage]);

      const preview = URL.createObjectURL(selectedImage);
      setImagePreviews([preview]);

      setResetImagesVisible(true);

      const storageRef = ref(storage, `images/${selectedImage.name}`);
      const snapshot = await uploadBytesResumable(storageRef, selectedImage);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Post the downloadURL to Firestore here

      const imageUrlsRef = doc(db, 'Banner', 'Banner');
      await setDoc(imageUrlsRef, { url: downloadURL });

      console.log('Image URL uploaded to Firestore:', downloadURL);

      setIsUploadComplete(true); // Set upload completion state
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false); // Stop loading indicator
      if (isUploadComplete) {
        alert('Image uploaded to Firestore successfully!');
      }
    }
  };

  const handleImageReset = () => {
    setImages([]);
    setImagePreviews([]);
    setResetImagesVisible(false);
    setIsUploadComplete(false); // Reset upload completion state
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Select Banner</DialogTitle>
      <DialogContent>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={buttonStyle}
        />

        <div style={imagesContainerStyle}>
          {imagePreviews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Image ${index + 1}`}
              style={imagePreviewStyle}
            />
          ))}
        </div>
        {resetImagesVisible && (
          <Button variant="outlined" color="secondary" onClick={handleImageReset}>
            RESET IMAGE
          </Button>
        )}
        {isLoading && <p>Uploading image...</p>}
      </DialogContent>
    </Dialog>
  );
};

export default ImageSelectionPage;
