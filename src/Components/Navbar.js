import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { faShoppingBag, faHeart} from '@fortawesome/free-solid-svg-icons';
import { auth } from '../firebase';
import SignInForm from '../Pages/SignInForm';
import { Dialog } from '@mui/material';
import AdminPanel from '../Pages/adminpanel';
import Cart from '../Pages/cart';
import MenuMobile from './MenuMobile';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Wishlist from '../Pages/Wishlist';
import CurrencyDropdown from './currecnydrop';
import { Container, Menu, LogoTitleContainer,CustomMenu,  } from '../Styles/navbarstyles';
import styled from 'styled-components';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const [isWishDialogOpen, setWhishDialogOpen] = useState(false); 
  const [burgerStatus, setBurgerStatus] = useState(false);
  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);


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

  const openSignInDialog = () => {
    setIsSignInDialogOpen(true);
  };


  const closeDialogs = () => {
    setIsSignInDialogOpen(false);
    setIsRegisterDialogOpen(false);
  };


  // Function to open the AdminPanel dialog
  const openAdminPanelDialog = () => {
    setIsAdminPanelOpen(true);
  };

  // Function to close the AdminPanel dialog
  const closeAdminPanelDialog = () => {
    setIsAdminPanelOpen(false);
  };

  const handleWhatsAppLinkClick = () => {
  window.location.href = 'https://wa.me/76101715'; // Replace with your WhatsApp number
};

const HiddenDiv = styled.div`
  /* Your existing styles */

  /* Default style for larger screens */
  display: none;

  @media only screen and (max-width: 600px) {
    /* Style for small screens */
    display: inline-block; /* Show the cart icon on small screens */
  }
`




  return (
    <Container>
      <CustomMenu style={{fontSize:"30px"}} onClick={() => setBurgerStatus(true)} />

      <Menu>
          <FontAwesomeIcon style={{ marginRight: '5px' }} icon={faInstagram} />
          <a href="https://instagram.com/gratiaonlineshop?igshid=OGQ5ZDc2ODk2ZA==">{"Instagram | "}</a>
        <Link to="/" onClick={handleWhatsAppLinkClick}>
        <FontAwesomeIcon icon={faWhatsapp} /> {/* Add WhatsApp icon */}
        <a href="#hero-section">00961 76101715</a>
        </Link>

      </Menu>
      <Link to="/" style={{ textDecoration: "none" }}>
        <LogoTitleContainer>GRATIA</LogoTitleContainer>
      </Link>

      <Menu>
            <a onClick={() => setIsCartDialogOpen(true)} style={{marginRight:"2px"}}>
              <FontAwesomeIcon style={{ marginLeft: '5px', marginRight: '5px' }} icon={faShoppingBag} />
              {"CART |"+" "}
            </a>
            <a onClick={() => setWhishDialogOpen(true)}>
              <FontAwesomeIcon style={{marginRight: '5px' }} icon={faHeart} />
              {"|"}
            </a>
        {user ? (
          <>
            <a onClick={openAdminPanelDialog} style={{}}> {"ACCOUNT| "}</a>
            <Dialog open={isAdminPanelOpen} onClose={closeAdminPanelDialog}>
            {userEmail === "lamis@gmail.com" ? (
            <AdminPanel onClose={closeAdminPanelDialog} isAdminPanel={true} />
              ) : (
            <AdminPanel onClose={closeAdminPanelDialog} isAdminPanel={false} />
              )}
            </Dialog>
          </>
        ) : (
          <>
                  <Link>
              <a onClick={openSignInDialog}>LOGIN |</a>
            </Link>
            

            <Dialog open={isSignInDialogOpen} onClose={closeDialogs}>
              <SignInForm onClose={closeDialogs} isSignIn={true} />
            </Dialog>

            <Dialog open={isRegisterDialogOpen} onClose={closeDialogs}>
              <SignInForm onClose={closeDialogs} isSignIn={false} />
            </Dialog>

          </>
        )}
            <CurrencyDropdown />

        <Dialog open={isCartDialogOpen} onClose={() => setIsCartDialogOpen(false)}>
          <Cart onClose={() => setIsCartDialogOpen(false)} />
        </Dialog>
        <Dialog open={isWishDialogOpen} onClose={() => setWhishDialogOpen(false)}>
          <Wishlist onClose={() => setWhishDialogOpen(false)} />
        </Dialog>
      </Menu>

      <Dialog open={burgerStatus} onClose={() => setBurgerStatus(false)}>
        <MenuMobile onClose={() => setBurgerStatus(false)} menuItems={["Cart"]}></MenuMobile>
      </Dialog>

    <HiddenDiv>
    <a onClick={() => setIsCartDialogOpen(true)}>
        <FontAwesomeIcon style={{ fontSize: '24px', marginRight:"10px" }} icon={faShoppingBag} />
     </a>
    </HiddenDiv>







    </Container>
  );
};

export default Navbar;
