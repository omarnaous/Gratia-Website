import React, { useEffect, useState, useRef } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ProductCard from '../Components/media_card';
import styled from 'styled-components';
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from '../firebase';
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

const SearchCard = styled.div`
  margin-left: 9%;
  margin-right: 9%;
  margin-top: 3%;
  background: #f5f5f5; // Background color
  border-radius: 5px; // Border radius
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Box shadow for the card effect
  padding: 15px; // Padding to create spacing within the card
  display: flex;
  align-items: center;
  @media only screen and (min-width: 320px) and (max-width: 479px){ 
    margin:3%
   }

  @media only screen and (min-width: 480px) and (max-width: 767px){ 
    margin:3%

  }

  @media only screen and (min-width: 768px) and (max-width: 991px){ 
    margin:3%
    
  }
`;


  const [productsData, setProductsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  const handleSearchClick = () => {
    inputRef.current.focus();
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting (you can also use an input with type="search" for built-in submit behavior)
    // Do something with the searchTerm, e.g., trigger a search
    console.log('Search Term:', searchTerm);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const data = [];

        querySnapshot.forEach((doc) => {
          const productData = { id: doc.id, ...doc.data() };
          if (productData.category.categoryName === nameParam) {
            data.push(productData);
          }
        });

        setProductsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [nameParam]);

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSearchSubmit}>
        <SearchCard
          onClick={handleSearchClick}
        >
          <button
            type="submit" // This button triggers the form submission
            style={{
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            🔍
          </button>
          <input
            type="text"
            id="search"
            placeholder="ENTER SEARCH HERE..."
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              fontSize: "18px",
            }}
            value={searchTerm}
            onChange={handleSearchInputChange} // Update the searchTerm when the input changes
            required
            ref={inputRef}
          />
          
        </SearchCard>
      </form>

      <ContainerBox>
        <ContentBox>
          <ThemeProvider theme={theme}>
            <Grid container spacing={0}>
              {productsData
                .filter((product) =>
                  product.productName.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((product, index) => (
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={3} key={index}>
                    <CardBox color="red">
                      <Link to={`/Detail?index=${index}`}>
                        <ProductCard  image={product.images[0]} />
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
