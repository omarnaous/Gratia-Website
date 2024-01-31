import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MaterialButton from '../Components/MaterialButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';

const cartKey = 'cartData'; // Key for storing cart data in local storage

const CartContainer = styled.div`
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

const Header = styled.div`
  display: flex;
  justify-content: space-between !important;
  align-items: center;
  padding: 10px;
`;

const Title = styled.h1`
  margin: 0;
`;

const EmptyCartMessage = styled.p`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin: 0;
  height: 100%;
  width: 100%;
  font-size: 20px;
  font-weight: "bold";
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

  @media only screen and (min-width: 320px) and (max-width: 479px){ 
  width: 20vw;
  height: 100%;

   }

  @media only screen and (min-width: 480px) and (max-width: 767px){ 
    width: 20vw;
  height: 100%;

  }

  @media only screen and (min-width: 768px) and (max-width: 991px){ 
    width: 20vw;
  height: 100%;

  }
  
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  width: 100%;
`;

const Cart = ({ onClose }) => {
  const [productsData, setProductsData] = useState([]);

  const [selectedCode, setSelectedCode] = useState(localStorage.getItem('selectedCode') || "USD");

  const [rate, setRate] = useState(0);




  useEffect(() => {
    // Fetch currency rate
    fetch(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=596b192be02d41e1b86c2d6a92e56801&symbols=${selectedCode}`)
      .then((response) => response.json())
      .then((data) => setRate(data.rates[selectedCode]));

    // Fetch product data from Firestore
    const fetchData = async () => {
      try {
     
        const localData = JSON.parse(localStorage.getItem(cartKey)) || [];
        setProductsData([...localData,]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCode]);



  // Calculate the total price of all products in the cart
  const totalPrice = productsData.reduce((total, product) => {
    const productPrice = product && product.product ? parseFloat(product.product.productPrice) : 0;
    return total + productPrice;
  }, 0) * rate;


  const DeleteFunction = (product) => {
    // Remove the product from the productsData array
    const updatedProducts = productsData.filter((item) => item !== product);
    setProductsData(updatedProducts);

    // Update local storage with the updated cart data
    localStorage.setItem(cartKey, JSON.stringify(updatedProducts));
  };

  return (
    <CartContainer>
      <Header>
        <Title>CART</Title>
      </Header>
      <ListContainer>
        {productsData.length === 0 ? (
          <div style={{ height: "100%" }}>
            <EmptyCartMessage>Your cart is empty.</EmptyCartMessage>
          </div>
        ) : (
          productsData.map((product, index) => (
            <CardContainer key={index}>
              <ProductImage src={product && product.product && product.product.images && product.product.images[0] ? product.product.images[0] : ''} alt="" />

              <Row>
                <ProductInfo>
                  <ProductTitle>
                    {product && product.product && product.product.productName
                      ? product.product.productName
                      : 'Product Name Not Available'}
                  </ProductTitle>

                  <ProductPrice>
                    {product && product.product && product.product.productPrice
                      ? `${selectedCode} ${(product.product.productPrice * rate).toFixed(0)}`
                      : 'Product Price Not Available'}
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
      <Row>
        <h3>Total</h3>
        <h3>{selectedCode} {totalPrice.toFixed(0)}</h3>
      </Row>
      <StyledLink to="/Check">
        {productsData.length > 0 && <MaterialButton icon={faShoppingBag} name={`CHECKOUT $${totalPrice.toFixed(2)}`} width="100%" />}
      </StyledLink>
    </CartContainer>
  );
};

export default Cart;
