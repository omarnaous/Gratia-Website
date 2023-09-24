import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProductCard from '../Components/media_card';
import styled from 'styled-components';
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from '../firebase'; // Import Firestore from your Firebase setup
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { useLocation } from 'react-router-dom';


export default function ResponsiveProductsGrid() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const nameParam = queryParams.get('name');


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
    margin-top: 3%;
  `;

const ContentBox = styled.div`
width: 100%;
margin-left: 12vw;
margin-right: 12vw;
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
  `;

  const CardBox = styled(Box)`
  `;

  const [productsData, setProductsData] = useState([]); // State variable to store the Firestore data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const data = [];
    
        querySnapshot.forEach((doc) => {
          const productData = { id: doc.id, ...doc.data() };
          if (productData.category.categoryName == nameParam) {
            data.push(productData);
          }
        });
    
        // Set the Firestore data in the state variable
        setProductsData(data);
        console.log(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  return (
    <div>
      <Navbar />
      <ContainerBox>
      <ContentBox>
        <ThemeProvider theme={theme}>
          <Grid container spacing={0}> {/* Adjust spacing as needed */}
            {productsData.map((product, index) => (
              <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={index}>
                <CardBox color="red">
                  <Link to={`/Detail?index=${index}`}>
                    <ProductCard height="40vh" image={product.images[0]} />
                  </Link>
                  <Title>{product.productName}</Title>
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
