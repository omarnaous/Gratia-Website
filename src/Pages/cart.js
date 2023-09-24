import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth } from '../firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import MaterialButton from '../Components/MaterialButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import DeleteIcon from '@mui/icons-material/Delete';



const CartContainer = styled.div`
  position: fixed;
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Center the element */
  width: 35%;
  height: 70vh; /* Adjust the height as needed */
  background-color: white;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  /* overflow-y: scroll; */
`;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;

`;


const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 10px;
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

const CheckoutButton = styled(MaterialButton)`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px; /* Add some left margin for spacing */
`;


const Cart = ({onClose}) => {
  const [productsData, setProductsData] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const q = query(collection(db, 'cart'), where('id', '==', user.uid));
        const querySnapshot = await getDocs(q);

        const products = [];
        querySnapshot.forEach((doc) => {
          products.push(doc.data().product);
        });

        setProductsData(products);
      }
    };

    fetchData();
  }, [user]);

  // Calculate the total price of all products in the cart
  const totalPrice = productsData.reduce((total, product) => total + parseFloat(product.productPrice), 0);

  return (
    <CartContainer>
      <Header>
        <Title>CART</Title>
      </Header>
      <ListContainer>
        {productsData.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          productsData.map((product) => (
            <CardContainer key={product.productId}>
              <ProductImage src={product.images[0]} alt="" />
              <ProductInfo>
                <ProductTitle>{product.productName}</ProductTitle>
                <ProductPrice>${product.productPrice}</ProductPrice>
                <DeleteButton >
                <DeleteIcon style={{color:"red"}} />
              </DeleteButton>
              </ProductInfo>
            </CardContainer>
          ))
        )}
      </ListContainer>
      {productsData.length > 0 && <CheckoutButton icon={faShoppingBag} name={`CHECKOUT $${totalPrice}`}></CheckoutButton>}
    </CartContainer>
  );
};

export default Cart;
