import React, { useState } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';
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
import AdminPanel from '../Pages/adminpanel';
import Wishlist from '../Pages/Wishlist';
import { MenuContainer, CloseButton,Header,ListContainer,MenuItemContainer,MenuItemInfo,MenuItemName,MenuItemPrice,Title } from '../Styles/menustyle';



const MenuMobile = ({ onClose }) => {
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isAdminDialog, setIsAdminDialog] = useState(false);
  const [isWishlistDialogOpen, setIsWishlistDialogOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);


  const closeDialogs = () => {
    setIsSignInDialogOpen(false);
    setIsRegisterDialogOpen(false);
    setIsCartDialogOpen(false);
    setIsWishlistDialogOpen(false);
  };
  const closeAdminPanelDialog = () => {
    setIsAdminPanelOpen(false);
  };

  const openSignInDialog = () => {
    setIsSignInDialogOpen(true);
  };

  const openRegisterDialog = () => {
    setIsRegisterDialogOpen(true);
  };

  const currentUser = auth.currentUser;

  const openAdminDialog = () => {
    setIsAdminDialog(true);
  };

  const closeAdminDialog = () => {
    setIsAdminDialog(false);
  };

  const openWishlistDialog = () => {
    setIsWishlistDialogOpen(true);
  };

  useEffect(() => {
    checkAuthState((authUser) => {
      setUser(authUser);
      setUserEmail(authUser ? authUser.email : null);
    });
  }, []);

  const checkAuthState = (callback) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        callback(user);
      } else {
        callback(null);
      }
    });
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully!");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
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
          {currentUser ? (
            // Render menu items for logged-in user
            <>
              <MenuItemContainer>
                <AccountCircleIcon />
                <MenuItemInfo>
                  <MenuItemName>Logged In</MenuItemName>
                  <MenuItemPrice>{currentUser.username}</MenuItemPrice>
                </MenuItemInfo>
              </MenuItemContainer>
              {currentUser.email === 'lamis@gmail.com' && (
                <MenuItemContainer onClick={openAdminDialog}>
                  <AccountCircleIcon />
                  <MenuItemInfo>
                    <MenuItemName>Account</MenuItemName>
                  </MenuItemInfo>
                </MenuItemContainer>
              )}
            </>
          ) : (
            // Render menu items for non-logged-in user
            <MenuItemContainer onClick={openSignInDialog}>
              <AccountCircleIcon />
              <MenuItemInfo>
                <MenuItemName>Sign In</MenuItemName>
              </MenuItemInfo>
            </MenuItemContainer>
          )}
          <MenuItemContainer onClick={() => setIsCartDialogOpen(true)}>
            <ShoppingCartIcon />
            <MenuItemInfo>
              <MenuItemName>Cart</MenuItemName>
            </MenuItemInfo>
          </MenuItemContainer>
          <MenuItemContainer onClick={openWishlistDialog}>
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
          {currentUser ? (
          <>
            <MenuItemContainer onClick={signOut}>
              <AccountCircleIcon />
              <MenuItemInfo>
                <MenuItemName>Sign Out</MenuItemName>
              </MenuItemInfo>
            </MenuItemContainer>
          </>
        ) : (
         <div></div>
        )}
          
        </ListContainer>
      </MenuContainer>

      <Dialog open={isCartDialogOpen} onClose={() => setIsCartDialogOpen(false)}>
        <Cart />
      </Dialog>

      <Dialog open={isSignInDialogOpen} onClose={closeDialogs}>
        <SignInForm />
      </Dialog>

      <Dialog open={isRegisterDialogOpen} onClose={closeDialogs}>
        <SignInForm />
      </Dialog>

      <Dialog open={isAdminDialog} onClose={closeAdminDialog}>
      {userEmail === "lamis@gmail.com" ? (
            <AdminPanel onClose={closeAdminPanelDialog} isAdminPanel={true} />
              ) : (
            <AdminPanel onClose={closeAdminPanelDialog} isAdminPanel={false} />
              )}
      </Dialog>

      <Dialog open={isWishlistDialogOpen} onClose={() => setIsWishlistDialogOpen(false)}>
        <Wishlist />
      </Dialog>
    </>
  );
};

export default MenuMobile;
