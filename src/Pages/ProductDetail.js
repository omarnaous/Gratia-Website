import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../Components/Navbar';
import styled from 'styled-components';
import CustomizedAccordions from '../Components/Accordion';
import MaterialButton from '../Components/MaterialButton';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { doc, setDoc } from 'firebase/firestore';
import { auth } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import Footer from '../Components/Footer';

const ProductDetail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const indexParam = queryParams.get('index');
  const [productsData, setProductsData] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
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

  useEffect(() => {
    if (productsData.length > 0 && indexParam !== null && indexParam >= 0 && indexParam < productsData.length) {
      const imageUrls = productsData[indexParam].images;
      setSelectedImage(imageUrls[0]);
    }
  }, [productsData, indexParam]);



  const Title = styled.h1`
    color: black;
    margin: 10px;
    overflow: hidden;
  `;

  const SubTitle = styled.h2`
    color: black;
    margin: 10px;
    overflow: hidden;
  `;




  const ImageGallery = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    max-width: 500px;
    overflow: hidden;
    margin-top: 20px;
    margin-bottom: 3vh;
    margin-left: 1vw;

    @media only screen and (max-width: 479px) {
      margin-left: 0vw;
      width: 100%;
    }

    @media only screen and (min-width: 480px) and (max-width: 767px) {
      width: 100%;
      margin-bottom: 3vh;
      margin-left: 18vw;
    }

    @media only screen and (min-width: 768px) and (max-width: 991px) {
      margin-left: 8vw;

      width: 100%;
    }
  `;

  const BigImage = styled.img`
    height: auto;
    max-height: 70vh;
    object-fit: cover;
    border-radius: 10px;
    margin: 10px;
    box-shadow: 0px 0px 10px rgba(128, 128, 128, 0.2);
    transition: transform 0.4s ease;
    overflow: hidden;

    @media only screen and (min-width: 320px) and (max-width: 479px) {
      width: 90%;
      height: 50vh;
      margin-top: 1vh;
    }

    @media only screen and (min-width: 480px) and (max-width: 767px) {
      width: 82%;
      height: 50vh;
      margin-top: 20px;
      margin: 0px;
    }

    @media only screen and (min-width: 768px) and (max-width: 991px) {
      width: 82%;
      height: 50vh;
      margin-top: 20px;
      margin: 0px;
    }
  `;

  const SmallImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 10px;
    margin: 10px;
    box-shadow: 0px 0px 10px rgba(128, 128, 128, 0.2);
    transition: transform 0.4s ease;
    overflow: hidden;

    &:hover {
      transform: scale(1.1);
    }

    max-width: 1000px;
    @media only screen and (min-width: 320px) and (max-width: 479px) {
      width: 100px;
      height: 100px;
    }
  `;

  const IconContainer = styled.div`
    display: flex;
    align-items: start;
    justify-content: start;
    flex-direction: row;
    gap: 20px;
    overflow: none;
    margin: 10px;
    overflow: hidden;

    &:hover {
      transform: scale(1.1);
    }
  `;

  const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
  `;

  const LoadingText = styled.div`
    font-size: 24px;
  `;

  if (!productsData.length) {
    return (
      <LoadingContainer>
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
    );
  }

  if (indexParam === null || indexParam < 0 || indexParam >= productsData.length) {
    return <div>Invalid product index.</div>;
  }

  const imageUrls = productsData[indexParam].images;

  const handleSmallImageClick = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const generateWhatsAppShareLink = () => {
    const currentURL = window.location.href;
    const encodedURL = encodeURIComponent(currentURL);
    return `https://wa.me/?text=${encodedURL}`;
  };

  async function addtoCart() {
    const cartKey = 'cartData'; // Key for storing cart data in local storage
    const existingCartData = localStorage.getItem(cartKey);
    const cartData = existingCartData ? JSON.parse(existingCartData) : [];
  
    // Add the selected product to the cart
    const newCartItem = {
      product: productsData[indexParam],
    };
    cartData.push(newCartItem);
  
    // Save the updated cart data to local storage
    localStorage.setItem(cartKey, JSON.stringify(cartData));
    alert("Added to cart");
  }
  async function addtoWish() {
    const cartKey = 'wish'; // Key for storing cart data in local storage
    const existingCartData = localStorage.getItem(cartKey);
    const cartData = existingCartData ? JSON.parse(existingCartData) : [];
  
    // Add the selected product to the cart
    const newCartItem = {
      product: productsData[indexParam],
    };
    cartData.push(newCartItem);
  
    // Save the updated cart data to local storage
    localStorage.setItem(cartKey, JSON.stringify(cartData));
    alert("Added to Wishlist");
  }
  
  



  const MaterialButtonContainer = styled.div`
    margin-left: 1.5vw;
    /* width: 25vw; */

    @media only screen and (max-width: 479px) {
      margin:0px;
      width: 100%;
    }

    @media only screen and (min-width: 480px) and (max-width: 767px) {
      width: 85%;
      margin:0px;
      margin-left: 8vw;

      
    }

    @media only screen and (min-width: 768px) and (max-width: 991px) {
      width: 85%;
      margin-left: 8vw;

    }
  `;

  const ProductContainer = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 85%;
    /* margin-left: 6vw; */
    margin-top: 10vh;
    @media only screen and (min-width: 320px) and (max-width: 479px){ 
      flex-direction: column;
      width: 100%;
      margin-top: 0vh;
      margin-left: 0vw;
     }

    @media only screen and (min-width: 480px) and (max-width: 767px){ 
      flex-direction: column;
      width: 100%;
      margin-top: 0vh;
      margin-left: 0vw;
     }

    @media only screen and (min-width: 768px) and (max-width: 991px){ 
      flex-direction: column;
      width: 100%;
      margin-top: 0vh;
      margin-left: 0vw;
     }

  `

  const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 25vw;
    margin-left: 1vh;
    @media only screen and (min-width: 320px) and (max-width: 479px){ 
      flex-direction: column;
      width: 100%;
      padding-left:5vw;
      margin-bottom: 20px;
     }

     @media only screen and (min-width: 480px) and (max-width: 767px){ 
      flex-direction: column;
      width: 100%;
      padding-left:9vw;
      margin-bottom: 2vh;
     }

    @media only screen and (min-width: 768px) and (max-width: 991px){ 
      flex-direction: column;
      width: 100%;
      padding-left:9vw;
      margin-bottom: 2vh;
     }

  `
  const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    /* background-color: red; */
    width: 25vw;
    margin-left: 1vh;

    @media only screen and (min-width: 320px) and (max-width: 479px){ 
      flex-direction: column;
      width: 100%;
      padding-left:4vw;
      margin-bottom: 20px;
     }

     @media only screen and (min-width: 480px) and (max-width: 767px){ 
      flex-direction: column;
      width: 100%;
      /* padding-left:9vw; */
      margin-bottom: 5vh;
     }

    @media only screen and (min-width: 768px) and (max-width: 991px){ 
      flex-direction: column;
      width: 100%;
      /* padding-left:9vw; */
      margin-bottom: 5vh;
     }


  `





  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
      <Navbar></Navbar>
      <ProductContainer>
        <LeftColumn>
          <Title>{productsData[indexParam].productName}</Title>
          <SubTitle>USD ${productsData[indexParam].productPrice}</SubTitle>
          {/* <IconContainer>
            <a href={generateWhatsAppShareLink()} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} size="2x" style={{ color: 'green' }} />
            </a>
            <a href="mailto:your@email.com" target="_blank" rel="noopener noreferrer">
              <EmailIcon color="primary" fontSize="large" />
            </a>
            <a href="https://www.instagram.com/your_instagram" target="_blank" rel="noopener noreferrer">
              <InstagramIcon style={{ color: '#e4405f' }} fontSize="large" />
            </a>
          </IconContainer> */}
          <CustomizedAccordions title={'Description'} paragraph={productsData[indexParam].description} />

        </LeftColumn>
        <BigImage src={selectedImage} onClick={() => handleSmallImageClick(0)}
        ></BigImage>
        <RightColumn>
          <ImageGallery>
            {imageUrls.map((imageUrl, index) => (
              <SmallImage
                key={index}
                src={imageUrl}
                alt={`Image ${index + 1}`}
                onClick={() => handleSmallImageClick(index)}
              />
            ))}
          </ImageGallery>
          <MaterialButtonContainer>
            <MaterialButton onClick={addtoCart} name="ADD TO CART" width="95%" radius="5px" />
            <MaterialButton onClick={addtoWish} name="ADD TO WISHLIST" width="95%" radius="5px" />
          </MaterialButtonContainer>
        </RightColumn>
      </ProductContainer>
      {lightboxOpen && (
        <Lightbox
          mainSrc={imageUrls[lightboxIndex]} // The image to display in the lightbox
          nextSrc={imageUrls[(lightboxIndex + 1) % imageUrls.length]} // The next image to display
          prevSrc={imageUrls[(lightboxIndex + imageUrls.length - 1) % imageUrls.length]} // The previous image to display
          onCloseRequest={() => setLightboxOpen(false)} // Handle close event
          onMovePrevRequest={() => setLightboxIndex((lightboxIndex + imageUrls.length - 1) % imageUrls.length)} // Handle previous image request
          onMoveNextRequest={() => setLightboxIndex((lightboxIndex + 1) % imageUrls.length)} // Handle next image request
        />
      )}

      {/* <Footer></Footer> */}
    </div>
  );
};

export default ProductDetail;
