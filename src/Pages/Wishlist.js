import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth } from '../firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, deleteDoc } from "firebase/firestore";

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
    width: 90%;
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

const EmptyWishlistMessage = styled.p`
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
    width: 50vw;
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

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const q = query(collection(db, 'whishlist'), where('id', '==', user.uid));
        const querySnapshot = await getDocs(q);

        const products = [];
        querySnapshot.forEach((doc) => {
          products.push(doc.data().product);
        });

        setWishlistData(products);
      }
    };

    fetchData();
  }, [user]);

  async function DeleteFunction(product) {
    try {
      // Construct the document ID based on the product and user ID
      const documentId = `${product.productName}${auth.currentUser.uid}`;

      // Delete the document from Firestore
      await deleteDoc(doc(db, "whishlist", documentId));

      // Fetch the updated wishlist data and set the state
      const q = query(collection(db, 'whishlist'), where('id', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);

      const updatedProducts = [];
      querySnapshot.forEach((doc) => {
        updatedProducts.push(doc.data().product);
      });

      setWishlistData(updatedProducts);
    } catch (error) {
      console.error('Error deleting product from wishlist:', error);
    }
  }

  return (
    <WishlistContainer>
      <Header>
        <Title>WISHLIST</Title>
      </Header>
      <ListContainer>
        {wishlistData.length === 0 ? (
          <EmptyWishlistMessage>Your wishlist is empty.</EmptyWishlistMessage>
        ) : (
          wishlistData.map((product) => (
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
    </WishlistContainer>
  );
};

export default Wishlist;
