import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DeleteIcon from '@mui/icons-material/Delete';

const WishlistContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35%;
  height: 80vh;
  background-color: white;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  @media only screen and (min-width: 320px) and (max-width: 479px){ 
  width: 95%;

   }

  @media only screen and (min-width: 480px) and (max-width: 767px){ 
    width: 95%;

  }

  @media only screen and (min-width: 768px) and (max-width: 991px){ 
    width: 95%;

  }
`;

const EmptyWishlistMessage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin: 0;
  height: 100%;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between !important;
  align-items: center;
  padding: 10px;
`;

const Title = styled.h1`
  margin: 0;
`;

const ListContainer = styled.div`
  flex: 1;
  width: 100%;
  margin: 10px;
  overflow-y: auto;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 95%;
  margin: 10px;
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const ProductImage = styled.img`
  width: 10vw;
  height: 15vh;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 10px;

  // Media queries for responsive design...
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h2`
  font-weight: bold;
  margin: 0;
`;

const ProductPrice = styled.h3`
  margin: 0;
`;

const DeleteButton = styled.button`
  background-color: #f5f5f5;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  margin: 10px;
`;

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const [selectedCode, setSelectedCode] = useState(localStorage.getItem('selectedCode') || "USD");
  const [rate, setRate] = useState(1); // Default rate is 1 for the selected currency

  useEffect(() => {
    // Fetch currency rate
    fetch(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=596b192be02d41e1b86c2d6a92e56801&symbols=${selectedCode}`)
      .then((response) => response.json())
      .then((data) => setRate(data.rates[selectedCode] || 1)); // Use 1 as a default rate if not available

    // Retrieve wishlist data from local storage
    const wishlistData = localStorage.getItem('wish');
    if (wishlistData) {
      setWishlistData(JSON.parse(wishlistData));
    }
  }, [selectedCode]);

  const DeleteFunction = (product) => {
    // Remove the product from the wishlistData array
    const updatedWishlist = wishlistData.filter((item) => item.productName !== product.productName);
    setWishlistData(updatedWishlist);

    // Update local storage with the updated wishlist data
    localStorage.setItem('wish', JSON.stringify(updatedWishlist));
  };

  return (
    <WishlistContainer>
      <Header>
        <Title>WISHLIST</Title>
      </Header>
      <ListContainer>
        {wishlistData.length === 0 ? (
          <div style={{ height: "100%" }}>
            <EmptyWishlistMessage>Your wishlist is empty.</EmptyWishlistMessage>
          </div>
        ) : (
          wishlistData.map((product, index) => (
            <CardContainer key={index}>
              <ProductImage src={product.product.images && product.product.images.length > 0 ? product.product.images[0] : 'fallback-image-url'} alt="" />
              <Row>
                <ProductInfo>
                  <ProductTitle>{product.product.productName}</ProductTitle>
                  <ProductPrice>
                    {selectedCode} {(product.product.productPrice * rate).toFixed(2)}
                  </ProductPrice>
                </ProductInfo>
                <DeleteButton onClick={() => DeleteFunction(product)}>
                  <DeleteIcon style={{ color: "black" }} />
                </DeleteButton>
              </Row>
            </CardContainer>
          ))
        )}
      </ListContainer>
    </WishlistContainer>
  );
};

export default Wishlist;
