import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { faShoppingBag, faHeart} from '@fortawesome/free-solid-svg-icons';
import { auth } from '../firebase';
import SignInForm from '../Pages/SignInForm';
import { Dialog } from '@mui/material';
import AdminPanel from '../Pages/adminpanel';
import Cart from '../Pages/cart';
import PersonIcon from '@mui/icons-material/Person';
import MenuMobile from './MenuMobile';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Wishlist from '../Pages/Wishlist';

const Navbar = ({ scrollToSection }) => {
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

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

  const [burgerStatus, setBurgerStatus] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const Container = styled.div`
  margin-top: 3vh;
  min-height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Adjusted to evenly distribute space between items */
  padding: 0px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  position: sticky;
  top: 0;

  /* Added flex properties */
  & > * {
    flex-grow:1; /* Items will take up available space */
    text-align: center; /* Optional: center align text */
  }

  a {
    font-size: 16px;
    margin-left: 3px;
  }
  /* background-color: red; */

  @media only screen and (min-width: 320px) and (max-width: 479px) {
    & > * {
    flex-grow:0; /* Items will take up available space */
    text-align: center; /* Optional: center align text */
  }
    margin: 2vh;
    /* justify-content: space-between; */ /* Commented out to let items take more space */
  }

  @media only screen and (min-width: 480px) and (max-width: 767px) {
    /* justify-content: space-between; */ /* Commented out to let items take more space */
  }
`;




  const LogoTitleContainer = styled.h1`
    color: black;
    font-size: 2.5rem;
  `;

  const Menu = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    @media only screen and (min-width: 320px) and (max-width: 479px) {
      display: none;
    }

    @media only screen and (min-width: 480px) and (max-width: 767px) {
      display: none;
    }

    a:hover {
      color: var(--main-color);
      transition: transform 0.2s ease-in;
    }

    a {
      text-decoration: none;
      color: black;
      font-weight: 600;
      text-transform: uppercase;
      flex-wrap: nowrap;
      text-align: center;
    }
  `;

  const CustomMenu = styled(MenuIcon)`
  color: black;
  cursor: pointer;
  font-size: 24px; /* Adjust the font size as needed */
  
  @media only screen and (min-width: 992px) {
    display: none !important;
  }
`;

  const [isSignInDialogOpen, setIsSignInDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);

  const openSignInDialog = () => {
    setIsSignInDialogOpen(true);
  };

  const openRegisterDialog = () => {
    setIsRegisterDialogOpen(true);
  };

  const closeDialogs = () => {
    setIsSignInDialogOpen(false);
    setIsRegisterDialogOpen(false);
  };

  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Function to open the AdminPanel dialog
  const openAdminPanelDialog = () => {
    setIsAdminPanelOpen(true);
  };

  // Function to close the AdminPanel dialog
  const closeAdminPanelDialog = () => {
    setIsAdminPanelOpen(false);
  };

  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false);
  const [isWishDialogOpen, setWhishDialogOpen] = useState(false);

  


const handleWhatsAppLinkClick = () => {
  window.location.href = 'https://wa.me/7071114465'; // Replace with your WhatsApp number
};

  return (
    <Container>
      <Menu>
        <Link to="/">
          <FontAwesomeIcon style={{ marginRight: '5px' }} icon={faInstagram} />
          <a href="#hero-section">{"Instagram | "}</a>
        </Link>
        <Link to="/" onClick={handleWhatsAppLinkClick}>
        <FontAwesomeIcon icon={faWhatsapp} /> {/* Add WhatsApp icon */}
        <a href="#hero-section">00961 70114465</a>
      </Link>

      </Menu>
      <Link to="/" style={{ textDecoration: "none" }}>
        <LogoTitleContainer>GRATIA</LogoTitleContainer>
      </Link>

      <Menu>
          <Link>
            <a onClick={() => setIsCartDialogOpen(true)}>
              <FontAwesomeIcon style={{ marginLeft: '5px', marginRight: '5px' }} icon={faShoppingBag} />
              {"|"}
            </a>
          </Link>
          <Link>
            <a onClick={() => setWhishDialogOpen(true)}>
              <FontAwesomeIcon style={{marginRight: '5px' }} icon={faHeart} />
              {"| "}
            </a>
          </Link>
        {user ? (
          <>
            <a onClick={openAdminPanelDialog}> {"ACCOUNT | "}</a>
            <Dialog open={isAdminPanelOpen} onClose={closeAdminPanelDialog}>
              <AdminPanel onClose={closeAdminPanelDialog} />
            </Dialog>
          </>
        ) : (
          <>
            <div></div>
          </>
        )}
        <Dialog open={isCartDialogOpen} onClose={() => setIsCartDialogOpen(false)}>
          {/* Pass a function to close the dialog */}
          <Cart onClose={() => setIsCartDialogOpen(false)} />
        </Dialog>
        <Dialog open={isWishDialogOpen} onClose={() => setWhishDialogOpen(false)}>
          {/* Pass a function to close the dialog */}
          <Wishlist onClose={() => setWhishDialogOpen(false)} />
        </Dialog>
        {user ? (
          <p> {" LOGGED IN"}</p>
        ) : (
          <>
            <Link>
              <a onClick={openSignInDialog}>LOGIN |</a>
            </Link>
            <Link>
              <a onClick={openRegisterDialog}>CREATE ACCOUNT</a>
            </Link>

            {/* Sign In Dialog */}
            <Dialog open={isSignInDialogOpen} onClose={closeDialogs}>
              <SignInForm onClose={closeDialogs} isSignIn={true} />
            </Dialog>

            {/* Register Dialog */}
            <Dialog open={isRegisterDialogOpen} onClose={closeDialogs}>
              <SignInForm onClose={closeDialogs} isSignIn={false} />
            </Dialog>
          </>
        )}
      </Menu>

      <Dialog open={burgerStatus} onClose={() => setBurgerStatus(false)}>
        <MenuMobile onClose={() => setBurgerStatus(false)} menuItems={["Cart"]}></MenuMobile>
      </Dialog>

      <CustomMenu onClick={() => setBurgerStatus(true)} />




    </Container>
  );
};

export default Navbar;
