import React, { useState } from 'react';
import {
  Button,
  Paper,
  TextField,
  Box,
  CircularProgress,
} from '@mui/material';
import Navbar from '../Components/Navbar';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import styled from 'styled-components';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const AddCategory = () => {
  const [productName, setCategoryName] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [resetImagesVisible, setResetImagesVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const storage = getStorage();

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const cardStyle = {
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
  };

  const textFieldStyle = {
    marginBottom: '16px',
  };

  const imagesContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    marginBottom: '16px',
  };

  const buttonStyle = {
    marginBottom: '16px',
    backgroundColor: 'black',
  };

  const imagePreviewStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '5px',
    objectFit: 'cover',
  };

  const handleAddProduct = async () => {
    if (!productName) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      setIsLoading(true);

      const uploadedImageUrls = [];
      for (const image of images) {
        const storageRef = ref(storage, `images/${image.name}`);
        const snapshot = await uploadBytesResumable(storageRef, image);
        const downloadURL = await getDownloadURL(snapshot.ref);
        uploadedImageUrls.push(downloadURL);
      }

      const productRef = doc(db, 'Categories', productName);
      await setDoc(
        productRef,
        {
          categoryName: productName,
          image: uploadedImageUrls,
        },
        { merge: true }
      );

      setCategoryName('');
      setImages([]);
      setImagePreviews([]);
      setResetImagesVisible(false);
      setIsLoading(false);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert(
        'An error occurred while adding the product. Please try again later.'
      );
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);

    const previews = selectedImages.map((image) =>
      URL.createObjectURL(image)
    );
    setImagePreviews(previews);

    setResetImagesVisible(true);
  };

  const handleImageReset = () => {
    setImages([]);
    setImagePreviews([]);
    setResetImagesVisible(false);
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
    <div>
      <div style={containerStyle}>
        <form>
          <h1 style={{ textAlign: 'center', margin: "10px" }}>Add Category</h1>

          <Paper elevation={3} style={cardStyle}>
            <TextField
              label="Category Name"
              id="filled-basic"
              variant="filled"
              fullWidth
              style={textFieldStyle}
              value={productName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginBottom: '16px' }}
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
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={handleImageReset}
                style={buttonStyle}
              >
                <h3 style={{ color: "white" }}>Reset Images</h3>
              </Button>
            )}


            <CustomButton type="submit" onClick={handleAddProduct} disabled={isLoading}>
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Add Category'
              )}
            </CustomButton>
          </Paper>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
