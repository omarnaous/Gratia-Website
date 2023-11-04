import React from 'react';
import styled from 'styled-components';
import MaterialButton from './MaterialButton';



const FooterContainer = styled.footer`
  background-color: white;
  color: #666;
  height: 100px; /* Fixed height */
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
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
  border: 1px solid #ccc;
  margin: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 50px;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const handleWhatsAppLinkClick = () => {
  window.location.href = 'https://wa.me/7071114465'; // Replace with your WhatsApp number
};

const Footer = () => {
  return (
    <FooterContainer>
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

