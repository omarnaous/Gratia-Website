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

  const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    min-height: 80vh; /* Use min-height to keep centering consistent */
    /* width: 82vw; */
    overflow: hidden;
    /* padding: 20px; */
    margin-left: 3vw;
    margin-right: 3vw;

    @media only screen and (max-width: 479px) {
      flex-direction: column;
      align-items: center;
      margin: 0;
    }
  `;

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

  const Column = styled.div`
    overflow: hidden;
    margin-left: 10px;
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    margin-left: 5vw;


    @media only screen and (min-width: 320px) and (max-width: 479px){ 
      width: 90%;
      margin: 0px;
      margin-left: 0vw;
    }
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
  `;

  const BigImage = styled.img`
    height: 65vh;
    width: 40vw;
    object-fit: cover;
    border-radius: 10px;
    margin: 10px;
    box-shadow: 0px 0px 10px rgba(128, 128, 128, 0.2);
    transition: transform 0.4s ease;
    overflow: hidden;
    margin-right: 5vw;

    &:hover {
      transform: scale(1.1);
    }

    @media only screen and (min-width: 320px) and (max-width: 479px){
      width: 82%;
      height: 50vh;
      margin-top: 20px;
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
      @media only screen and (min-width: 320px) and (max-width: 479px){
        width: 80px;
        height: 80px;
    }
  `;

  const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding: 15px;
    gap: 20px;
    width: auto;
    margin-left: 10px;
    margin-top: 10px;
    overflow: none;
    border-radius: 10px;
    margin: 10px;
    box-shadow: 0px 0px 10px rgba(128, 128, 128, 0.2);
    transition: transform 0.4s ease;
    overflow: hidden;

    &:hover {
      transform: scale(1.1);
    }
    
  `;

  if (!productsData.length) {
    return <div>Loading...</div>;
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
    const docRef = doc(db, 'cart', productsData[indexParam].productName + auth.currentUser.uid);
    setDoc(docRef, {
      id: auth.currentUser.uid,
      product: productsData[indexParam],
    });
  }
  async function addtoWish() {
    const docRef = doc(db, 'whishlist', productsData[indexParam].productName + auth.currentUser.uid);
    setDoc(docRef, {
      id: auth.currentUser.uid,
      product: productsData[indexParam],
    });
  }

  const MaterialButtonContainer = styled.div`
  margin-left: 1.5vw;
  width: 25vw;
  @media only screen and (max-width: 479px) {
    width: 100%; /* Set a different width for mobile devices */
  }
`;

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container>
        <Column>
          <Title>{productsData[indexParam].productName}</Title>
          <SubTitle>USD ${productsData[indexParam].productPrice}</SubTitle>
          <IconContainer>
            <a href={generateWhatsAppShareLink()} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} size="2x" style={{ color: 'green' }} />
            </a>
            <a href="mailto:your@email.com" target="_blank" rel="noopener noreferrer">
              <EmailIcon color="primary" fontSize="large" />
            </a>
            <a href="https://www.instagram.com/your_instagram" target="_blank" rel="noopener noreferrer">
              <InstagramIcon style={{ color: '#e4405f' }} fontSize="large" />
            </a>
          </IconContainer>
        </Column>
        <BigImage src={selectedImage}></BigImage>
        <Column style={{marginLeft:"0vw"}}>

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
          <CustomizedAccordions title={'Description'} paragraph={productsData[indexParam].description} />

          <MaterialButton onClick={addtoCart} name="ADD TO CART" width="100%" radius="5px" />
          <MaterialButton onClick={addtoWish} name="ADD TO WISHLIST" width="100%" radius="5px" />

          </MaterialButtonContainer>
        </Column>
      </Container>
      </div>
      
      {lightboxOpen && (
        <Lightbox
          mainSrc={imageUrls[lightboxIndex]}
          nextSrc={imageUrls[(lightboxIndex + 1) % imageUrls.length]}
          prevSrc={imageUrls[(lightboxIndex + imageUrls.length - 1) % imageUrls.length]}
          onCloseRequest={() => setLightboxOpen(false)}
          onMovePrevRequest={() => setLightboxIndex((lightboxIndex + imageUrls.length - 1) % imageUrls.length)}
          onMoveNextRequest={() => setLightboxIndex((lightboxIndex + 1) % imageUrls.length)}
        />
      )}
      <Footer />
    </div>
  );
};

export default ProductDetail;
