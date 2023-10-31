import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import styled from 'styled-components';

import {
  Button,
  Typography,
  Container,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  CircularProgress,
} from '@mui/material';
import Navbar from '../Components/Navbar';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const Addproducts = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [resetImagesVisible, setResetImagesVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


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

  const storage = getStorage();

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // minHeight: '90vh',
  };

  const cardStyle = {
    padding: '16px',
    borderRadius: '8px',
    // backgroundColor: '#f0f0f0',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
  };

  const textFieldStyle = {
    marginBottom: '16px',
  };

  const selectStyle = {
    marginBottom: '16px',
    width: '100%',
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
    if (!productName || !productPrice || !category || !description) {
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
  
      const productRef = doc(db, 'products', productName);
      await setDoc(
        productRef,
        {
          productName: productName,
          productPrice: productPrice,
          category: category,
          description: description,
          images: uploadedImageUrls,
        },
        { merge: true }
      );
  
      // Reset the input fields and images after successfully adding the product
      setProductName('');
      setProductPrice('');
      setCategory('');
      setDescription('');
      setImages([]);
      setImagePreviews([]);
      setResetImagesVisible(false);
      setIsLoading(false);
      alert('Product added successfully!');
      
      // Reset the images
      handleImageReset();
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
  const [categoryData, setCategoryData] = useState([]); // State variable to store the Firestore data

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
        setCategoryData([...data].reverse());
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);




  return (
    <div>
      <div style={containerStyle}>
        <form>
          <Typography variant="h5" style={{ marginTop: "10px" }} align="center" gutterBottom>
            ADD PRODUCTS
          </Typography>
          <Paper elevation={0} style={cardStyle}>
            <TextField
              label="Product Name"
              id="filled-basic"
              variant="filled"
              fullWidth
              style={textFieldStyle}
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />

            <TextField
              label="Product Price"
              id="filled-basic"
              variant="filled"
              fullWidth
              style={textFieldStyle}
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />

            <FormControl variant="outlined" style={selectStyle}>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                id="filled-basic"
                variant="filled"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {
                  categoryData.map((category, index) => (
                    <MenuItem key={index} value={category}>
                      {category.categoryName}
                    </MenuItem>
                  ))
                }

              </Select>
            </FormControl>

            <TextField
              label="Description"
              id="filled-basic"
              variant="filled"
              fullWidth
              multiline
              rows={4}
              style={textFieldStyle}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{
                marginTop:"10px",
                marginBottom: "10px"
              }}
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
                'Add Product'
              )}
            </CustomButton>

          
          </Paper>
        </form>
      </div>
    </div>
  );
};

export default Addproducts;
