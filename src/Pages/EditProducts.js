import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProductCard from '../Components/media_card';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { auth, db } from '../firebase';
import Button from '@mui/material/Button'; // Import Material-UI Button
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 600,
      lg: 900,
      xl: 1200,
      tablet: 768,
    },
  },
});

const ContainerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
`;

const ContentBox = styled.div`
  width: 75%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h3`
  color: black;
  font-weight: bold;
  text-align: center;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CardBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
`;

const DeleteButton = styled(Button)`
  background-color: red;
  color: white;
  margin-top: 10px;
`;

export default function EditProduct() {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const data = [];

        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        setProductsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (documentId) => {
    try {
      // Delete the document from Firestore
      await deleteDoc(doc(db, 'products', documentId));

      // Update the local state by removing the deleted item
      setProductsData((prevData) =>
        prevData.filter((item) => item.id !== documentId)
      );
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div>
      <Navbar />
       <ContainerBox>
      <ContentBox>
        <ThemeProvider theme={theme}>
          <Grid container spacing={2}>
            {productsData.map((product, index) => (
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
                <CardBox>
                  <Link to={`/Detail?index=${index}`}>
                    <ProductCard height="40vh" image={product.images[0]} />
                  </Link>
                  <Title>{product.productName}</Title>
                  <DeleteButton
                    variant="contained"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </DeleteButton>
                </CardBox>
              </Grid>
            ))}
          </Grid>
        </ThemeProvider>
      </ContentBox>
    </ContainerBox>
    </div>
   
  );
}
