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

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Now, you can perform actions based on the submitted search term.
    // For example, you can log it to the console or perform an API call.
    console.log('Search term:', searchTerm);

    // You can also use the search term to perform other actions, like filtering data.

    // If you want to navigate to another page or perform some other action,
    // you can do that here.
  };

  const cardStyle = {
    margin: '0 auto', // Center horizontally
    marginTop: '3%',
    background: '#f5f5f5',
    width: '80%',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    '@media only screen and (min-width: 320px) and (max-width: 479px)': {
      margin: '3%',
    },
    '@media only screen and (min-width: 480px) and (max-width: 767px)': {
      margin: '3%',
    },
    '@media only screen and (min-width: 768px) and (max-width: 991px)': {
      margin: '3%',
    },
  };



  return (
    <div>
      <Navbar />
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          id="search"
          placeholder="ENTER SEARCH HERE..."
          style={{
            ...cardStyle,
            border: 'none',
            outline: 'none',
            // borderBottom: '1px solid #000', // Black border when active
          }}
          ref={inputRef}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />


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
                        <ProductCard image={product.images[0]} />
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
