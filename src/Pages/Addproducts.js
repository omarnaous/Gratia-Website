import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";

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

  const storage = getStorage();

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '90vh',
  };

  const cardStyle = {
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: '#f0f0f0',
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

      setProductName('');
      setProductPrice('');
      setCategory('');
      setDescription('');
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
      <Navbar></Navbar>
      <div style={containerStyle}>
        <Container maxWidth="xs">
          <form>
            <Typography variant="h4" align="center" gutterBottom>
              ADD PRODUCTS
            </Typography>
            <Paper elevation={3} style={cardStyle}>
              <TextField
                label="Product Name"
                variant="outlined"
                fullWidth
                style={textFieldStyle}
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />

              <TextField
                label="Product Price"
                variant="outlined"
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
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  {
                    categoryData.map((category,index) => (
                      <MenuItem key={index} value={category}>
                        {category.categoryName}
                      </MenuItem>
                    ))
                  }

                </Select>
              </FormControl>

              <TextField
                label="Description"
                variant="outlined"
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
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={handleImageReset}
                  style={buttonStyle}
                >
                  Reset Images
                </Button>
              )}

              {isLoading ? (
                <Box display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleAddProduct}
                  style={buttonStyle}
                >
                  Add Product
                </Button>
              )}
            </Paper>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default Addproducts;
