import styled from "styled-components";


export const FooterContainer = styled.footer`
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

export const FooterLink = styled.a`
  color: #666;
  text-decoration: none;
  margin: 0 10px;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #333;
  }
`;


export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;