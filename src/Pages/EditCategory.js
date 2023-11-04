import React, { useState, useEffect } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  TextField,
  Paper,
  InputLabel,

} from '@mui/material';
import { collection, getDocs } from "firebase/firestore";
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

const EditCategoryWithImage = () => {
  const [category, setCategory] = useState('');
  const [categoryData, setCategoryData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newTitle, setNewTitle] = useState(''); // Add state for the new title

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Categories"));
        const data = [];

        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push({ id: doc.id, ...doc.data() });
        });

        // Set the Firestore data in the state variable
        setCategoryData([...data]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Handle the new title input
  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      setSelectedImage(image);
      setImagePreview(URL.createObjectURL(image));
    }
  };

  const handleImageReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
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

  const imagesContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
  };

  const imageStyle = {
    width: '100px',
    height: '100px',
    marginTop: '10px',
  };

  const handleImageUpload = async () => {
    const imageURL = await uploadImageToStorage();
    // Update the category title and banner image here
    updateCategoryTitle(newTitle);
    updateBanner(imageURL);
    alert('Category title and image updated successfully!');
    handleImageReset();

  };

  const uploadImageToStorage = async () => {
    if (selectedImage) {
      try {
        setIsLoading(true);
        const storage = getStorage();
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

  const updateCategoryTitle = async (newTitle, imageURL) => {
    // Update the Firestore document with the new title and image
    try {
      const categoryRef = doc(db, 'Categories', category); // Replace 'Categories' with your collection name
      await setDoc(
        categoryRef,
        {
          categoryName: newTitle,
          image: imageURL,
        },
        { merge: true }
      );
      alert('Category title and image updated successfully!');
    } catch (error) {
      console.error('Error updating category title and image:', error);
    }
  };
  
  

  const updateBanner = async (imageURL) => {
    // Update the Firestore document with the new image
    try {
      const categoryRef = doc(db, 'Categories', category); // Replace 'Categories' with your collection name
      await setDoc(
        categoryRef,
        {
          image: imageURL,
        },
        { merge: true }
      );
    } catch (error) {
      console.error('Error updating category image:', error);
    }
  };
  


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


  return (
    <div style={{containerStyle}}>
        <Paper style={cardStyle}>

        <FormControl variant="outlined" style={{ marginBottom: '16px', width: '100%' }}>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={category}
                onChange={handleCategoryChange}
                required
              >
                {categoryData.map((category, index) => (
                  <MenuItem key={index} value={category.categoryName}>
                    {category.categoryName}
                  </MenuItem>
                ))
                }
              </Select>
            </FormControl>

      <TextField
        label="New Title"
        variant="outlined"
        fullWidth
        style={{ marginBottom: '16px' }}
        value={newTitle}
        onChange={handleTitleChange}
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
          'Edit Category'
        )}
      </CustomButton>
      </Paper>

    </div>
    
  );
};

export default EditCategoryWithImage;
