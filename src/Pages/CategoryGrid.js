import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProductCard from '../Components/media_card';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from '../firebase'; // Import Firestore from your Firebase setup
import { Link } from 'react-router-dom';

export default function CategoryGrid() {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 450,
        md: 600,
        lg: 900,
        xl: 1200,
        tablet: 768, // Adjusted breakpoint for tablets
      },
    },
  });

  const ContainerBox = styled.div`
    display: flex;
    justify-content: center; /* Horizontally center content */
    align-items: center;
    margin-top: 1%;
  `;

  const ContentBox = styled.div`
    width: 100%;
    margin-top: 1vh;
    /* margin-left: 10.2vw;
    margin-right: 10.2vw; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    @media only screen and (min-width: 320px) and (max-width: 479px){ 
        margin-left: 0;
        margin-right: 0;

     }

    @media only screen and (min-width: 480px) and (max-width: 767px){ 
        margin-left: 0;
        margin-right: 0;

    }
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
    font-size: 1.5rem;
    font-weight: bold;
  `;

  const CardBox = styled(Box)`
  `;

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
    <ContainerBox>
      <ContentBox>
        <ThemeProvider theme={theme}>
          <Grid container spacing={0}> {/* Adjust spacing as needed */}
            {categoryData.map((product, index) => (
              <Grid item xs={12} sm={6} md={12} lg={4} xl={4} key={index}>
                <CardBox color="red">
                  <Link to={`/ProductsPage?name=${product.categoryName}`}>
                    <ProductCard height="40vh" image={product.image} />
                  </Link>
                  <Title>{product.categoryName}</Title>
                </CardBox>
              </Grid>
            ))}
          </Grid>
        </ThemeProvider>
      </ContentBox>
    </ContainerBox>
  );
}
