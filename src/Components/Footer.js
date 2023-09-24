import React from 'react';
import styled from 'styled-components';
import MaterialButton from './MaterialButton';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #f0f0f0; /* Light grey background color */
  color: #666;
  padding-bottom: 10px;
  padding-top: 10px;
  margin-top: 10vh;
  text-align: center;
  /* bottom: 0;
  left: 0;
  right: 0; */
  display: flex;
  flex-direction: column; /* Display items in a column */
  align-items: center;
  justify-content: center; /* Center the content horizontally */
`;

const FooterLink = styled.a`
  color: #666;
  text-decoration: none;
  margin: 0 10px;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #333;
  }
`;

const ContactButton = styled(MaterialButton)`
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc; /* Light grey border color */
  margin: 10px;
  box-shadow: '0px 4px 8px rgba(0, 0, 0, 0.1)';
  padding: 10px 50px; /* Adjust padding */
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px; /* Add border radius */
`;


const Row = styled.div`
display: flex;
flex-direction: row;

`

const handleWhatsAppLinkClick = () => {
  window.location.href = 'https://wa.me/7071114465'; // Replace with your WhatsApp number
};

const Footer = () => {
  return (
    <FooterContainer>
      {/* <ContactButton as="a" href="/contact-us">
        <Link style={{textDecoration:"none", color:"black"}} to="/" onClick={handleWhatsAppLinkClick}>
          CONTACT US <br /> +961 70 11 44 65
        </Link>
      </ContactButton> */}

      <Row>
        <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
        <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
        <FooterLink href="/cookies-policy">Cookies Policy</FooterLink>
        <FooterLink href="/cookies-policy">&#169; 2023 GRATIA SAL</FooterLink>

      </Row>

    </FooterContainer>
  );
};

export default Footer;
