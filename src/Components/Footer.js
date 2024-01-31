import React, { useState } from 'react';
import { Dialog } from '@mui/material';
import { FooterContainer,FooterLink, Row } from '../Styles/footerstyles';

const Footer = () => {
  const [isTermsDialogOpen, setIsTermsDialogOpen] = useState(false);
  const [isPrivacyDialogOpen, setIsPrivacyDialogOpen] = useState(false);
  const [isCookiesDialogOpen, setIsCookiesDialogOpen] = useState(false);

  return (
    <FooterContainer>
      <Row>
        <FooterLink href="#" onClick={() => setIsTermsDialogOpen(true)}>
          Terms of Service
        </FooterLink>
        <FooterLink href="#" onClick={() => setIsPrivacyDialogOpen(true)}>
          Privacy Policy
        </FooterLink>
        <FooterLink href="#" onClick={() => setIsCookiesDialogOpen(true)}>
          Cookies Policy
        </FooterLink>
        <FooterLink>&#169; 2023 GRATIA SAL</FooterLink>
      </Row>

      <Dialog open={isTermsDialogOpen} onClose={() => setIsTermsDialogOpen(false)}>
        <div style={{ margin: "10px" }}>

          <h2>Terms of Service</h2>
          <p>
            Our Terms of Service outline the rules and regulations for the use of our online boutique, GRATIA. By accessing this website, we assume you accept these terms and conditions. Do not continue to use GRATIA Online if you do not agree to all of the terms and conditions stated on this page.
          </p>
          <p>
            Our Terms and Conditions were created with the help of the{" "}
            <a href="https://www.termsandconditionsgenerator.com">Terms & Conditions Generator</a>.
          </p>
        </div>
      </Dialog>

      <Dialog open={isPrivacyDialogOpen} onClose={() => setIsPrivacyDialogOpen(false)}>
        <div style={{ margin: "10px" }}>

          <h2>Privacy Policy</h2>
          <p>
            Your privacy is important to us. It is GRATIA's policy to respect your privacy regarding any information we may collect from you across our website.
          </p>
          <p>
            We don't ask for personal information unless we truly need it. We don't share your personal information with anyone except to comply with the law, develop our products, or protect our rights.
          </p>
        </div>
      </Dialog>

      <Dialog open={isCookiesDialogOpen} onClose={() => setIsCookiesDialogOpen(false)}>
        <div style={{ margin: "10px" }}>
          <h2>Cookies Policy</h2>
          <p>
            Our website uses cookies. By using our website and agreeing to this policy, you consent to our use of cookies in accordance with the terms of this policy.
          </p>
          <p>
            Cookies are files sent by web servers to web browsers and stored by the web browsers. The information is then sent back to the server each time the browser requests a page from the server. This enables a web server to identify and track web browsers.
          </p>
        </div>
      </Dialog>
    </FooterContainer>
  );
};

export default Footer;
