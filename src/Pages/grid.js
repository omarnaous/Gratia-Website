import React, { useEffect, useState, useRef } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ProductCard from '../Components/media_card';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { useLocation } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { collection, getDocs } from "firebase/firestore";


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
    width: 100%;
    margin-left: 10.3vw;
    margin-right: 10.3vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    @media only screen and (min-width: 320px) and (max-width: 479px) {
      margin-left: 0;
      margin-right: 0;
    }

    @media only screen and (min-width: 480px) and (max-width: 767px) {
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
  `;

  const CardBox = styled(Box)``




  const [productsData, setProductsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'products', 'products');
        const docSnap = await getDoc(docRef);
  
        // Check if the document exists
        if (docSnap.exists()) {
          const allProducts = docSnap.data().all;
  
          // Filter products based on category name (nameParam)
          const filteredProducts = allProducts.filter(product => {
            // Assuming each product has a 'category' property
            return product.category.categoryName === nameParam;
          });

          document.title = nameParam;


          setProductsData(filteredProducts);
  
          // Log the filtered products for debugging
          console.log('Filtered Products:', filteredProducts);
  
          // Now you can use filteredProducts to set your state or perform other actions
          // setProductsData(filteredProducts);
          setLoading(false);
        } else {
          console.log('No data found for the specified document.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [nameParam]);
  

  // const cardStyle = {
  //   // Common styles
  //   marginTop: '3%',
  //   background: '#f5f5f5',
  //   width: '80vw',
  //   borderRadius: '5px',
  //   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
  //   padding: '15px',
  //   display: 'flex',
  //   alignItems: 'center',
  
  //   // Media query for small screens
  //   '@media only screen and (min-width: 480px) and (max-width: 767px)': {
  //     width: '90vw',
  //     flexDirection: 'column', // Stack items vertically on small screens
  //   },
  // };
  





  return (
    <div>
      <Navbar />
      {/* <form onSubmit={handleFormSubmit}>
   
        <input
          type="text"
          id="search"
          placeholder="ENTER SEARCH HERE..."
          className='card'
          style={{
            // ...cardStyle,
            width:"80%"
            border: 'none',
            outline: 'none',
          }}
          ref={inputRef}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form> */}

      <ContainerBox>
        <ContentBox>
          <ThemeProvider theme={theme}>
            {loading ? (
              // Show loading indicator here
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 'calc(100vh - 250px)',
                }}
              >
                <h3>Loading...</h3>
              </div>
            ) : productsData.length === 0 ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 'calc(100vh - 250px)',
                }}
              >
                <h3>Product Not found</h3>
              </div>
            ) : (
              <Grid container spacing={0}>
                {productsData
                  .filter((product) =>
                    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((product, index) => (
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={3} key={index}>
                      <CardBox>
                      <Link to={`/Detail?index=${index}&category=${nameParam}`}>
                          <ProductCard image={product.images[0]} />
                        </Link>
                        <Title>{product.productName}</Title>
                      </CardBox>
                    </Grid>
                  ))
                }
              </Grid>
            )}
          </ThemeProvider>
        </ContentBox>
      </ContainerBox>
    </div>
  );






}
