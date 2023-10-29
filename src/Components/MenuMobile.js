import React, { useState } from 'react';
import styled from 'styled-components';
import CancelIcon from '@mui/icons-material/Cancel';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Dialog } from '@mui/material';
import SignInForm from '../Pages/SignInForm';
import Cart from '../Pages/cart';
import { auth } from '../firebase';


const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  height: 100vh;
  background-color: white;
  box-shadow: -5px 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-right: 10px;
`;

const Title = styled.h1`
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ListContainer = styled.div`
  flex: 1;
  width: 100%;
  margin: 10px;
  overflow-y: scroll;
`;

const MenuItemContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  a {
    text-decoration: none;
    color: black;
  }
`;

const MenuItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const MenuItemName = styled.h2`
  font-weight: bold;
  margin: 0;
`;

const MenuItemPrice = styled.h3`
  margin: 0;
`;

const MenuMobile = ({ onClose }) => {
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);

  const closeDialogs = () => {
    setIsSignInDialogOpen(false);
    setIsRegisterDialogOpen(false);
    setIsCartDialogOpen(false);
  };

  const openSignInDialog = () => {
    setIsSignInDialogOpen(true);
  };

  const openRegisterDialog = () => {
    setIsRegisterDialogOpen(true);
  };

  const currentUser = auth.currentUser;



  return (
    <>
      <MenuContainer>
        <Header>
          <Title>GRATIA</Title>
          <CloseButton onClick={onClose}>
            <CancelIcon />
          </CloseButton>
        </Header>
        <ListContainer>
          {/* Conditionally render based on currentUser */}
          {currentUser ? (
            // Render menu items for logged-in user
            <MenuItemContainer>
              <AccountCircleIcon />
              <MenuItemInfo>
                <MenuItemName>Logged In</MenuItemName>
                <MenuItemPrice>{currentUser.username}</MenuItemPrice>
              </MenuItemInfo>
            </MenuItemContainer>
          ) : (
            // Render menu items for non-logged-in user
            <>
              <MenuItemContainer onClick={openSignInDialog}>
                <AccountCircleIcon />
                <MenuItemInfo>
                  <MenuItemName >Sign In</MenuItemName>
                </MenuItemInfo>
              </MenuItemContainer>
              <MenuItemContainer onClick={openRegisterDialog}>
                <AccountCircleIcon />
                <MenuItemInfo>
                  <MenuItemName >Register</MenuItemName>
                </MenuItemInfo>
              </MenuItemContainer>
            </>
          )}
          <MenuItemContainer onClick={() => setIsCartDialogOpen(true)}>
            <ShoppingCartIcon />
            <MenuItemInfo>
              <MenuItemName >Cart</MenuItemName>
            </MenuItemInfo>
          </MenuItemContainer>
          <MenuItemContainer>
            <FavoriteIcon />
            <MenuItemInfo>
              <MenuItemName>Wishlist</MenuItemName>
            </MenuItemInfo>
          </MenuItemContainer>
          <MenuItemContainer>
            <InstagramIcon />
            <MenuItemInfo>
              <MenuItemName>
                <a href="https://www.instagram.com/">Instagram</a>
              </MenuItemName>
            </MenuItemInfo>
          </MenuItemContainer>
          <MenuItemContainer>
            <WhatsAppIcon />
            <MenuItemInfo>
              <MenuItemName>
                <a href="https://wa.me/your-whatsapp-number">WhatsApp</a>
              </MenuItemName>
            </MenuItemInfo>
          </MenuItemContainer>
        </ListContainer>
      </MenuContainer>

      <Dialog open={isCartDialogOpen} onClose={() => setIsCartDialogOpen(false)}>

        <Cart />
      </Dialog>

      <Dialog open={isSignInDialogOpen} onClose={closeDialogs}>
        {/* Sign In Form */}
        <SignInForm onClose={closeDialogs} isSignIn={true} />
      </Dialog>

      <Dialog open={isRegisterDialogOpen} onClose={closeDialogs}>
        {/* Register Form */}
        <SignInForm onClose={closeDialogs} isSignIn={false} />
      </Dialog>
    </>
  );
};

export default MenuMobile;
