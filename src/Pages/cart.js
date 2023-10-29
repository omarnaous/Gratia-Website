import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth } from '../firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import MaterialButton from '../Components/MaterialButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, deleteDoc } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const CartContainer = styled.div`
  position: fixed;
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Center the element */
  width: 35%;
  height: 80vh; /* Adjust the height as needed */
  background-color: white;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Apply elevation */
  border-radius: 10px; /* Apply border-radius */
  @media only screen and (min-width: 320px) and (max-width: 479px){ 
    width: 90%;
   }

  @media only screen and (min-width: 480px) and (max-width: 767px){  }

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
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Apply elevation */
  border-radius: 10px; /* Apply border-radius */
`;

const ProductImage = styled.img`
  width: 10vw;
  height: 15vh;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 10px;
  @media only screen and (min-width: 320px) and (max-width: 479px){ 
    width: 50vw
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
const CheckoutButton = styled(MaterialButton)`
  width: 400px !important; /* Set your desired width value here */
  /* Other styles... */
`;




const DeleteButton = styled.button`
  background-color: #f5f5f5; /* Slight grey background color */
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-left: 10px; /* Add some left margin for spacing */
  width: 40px; /* Increase the width and height for a larger radius */
  height: 40px;
  border-radius: 50%; /* Make it circular */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Apply elevation */
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  margin: 10px;
`;
const StyledLink = styled(Link)`
  /* Your custom styles here */
  text-decoration: none; /* Remove underline */
  color: inherit; /* Inherit text color */
  cursor: pointer; /* Change cursor to pointer */
  width: 100%;
`;

const Cart = ({ onClose }) => {
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

  async function DeleteFunction(product) {
    try {
      // Construct the document ID based on the product and user ID
      const documentId = `${product.productName}${auth.currentUser.uid}`;

      // Delete the document from Firestore
      await deleteDoc(doc(db, "cart", documentId));

      // Fetch the updated cart data and set the state
      const q = query(collection(db, 'cart'), where('id', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);

      const updatedProducts = [];
      querySnapshot.forEach((doc) => {
        updatedProducts.push(doc.data().product);
      });

      setProductsData(updatedProducts);
    } catch (error) {
      console.error('Error deleting product from cart:', error);
    }
  }

  return (
    <CartContainer>
      <Header>
        <Title>CART</Title>
      </Header>
      <ListContainer>
        {productsData.length === 0 ? (
          <EmptyCartMessage>Your cart is empty.</EmptyCartMessage>
        ) : (
          productsData.map((product) => (
            <CardContainer key={product.productId}>
              <ProductImage src={product.images[0]} alt="" />
              <Row>
                <ProductInfo>
                  <ProductTitle>{product.productName}</ProductTitle>
                  <ProductPrice>${product.productPrice}</ProductPrice>
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
      <h3>${totalPrice}</h3> 
      </Row>
      <StyledLink to="/Check">
      {productsData.length > 0 && <CheckoutButton icon={faShoppingBag} name={`CHECKOUT $${totalPrice}`} width="100%" />}

      </StyledLink>
    </CartContainer>
  );
};

export default Cart;
