
import styled from "styled-components";
import MenuIcon from '@mui/icons-material/Menu';



export const Container = styled.div`
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
  text-align: start; /* Optional: center align text */
}
A{}
margin-left: 2vw;
width: 95%;
}

@media only screen and (min-width: 480px) and (max-width: 767px) {
  /* justify-content: space-between; */ /* Commented out to let items take more space */
}
`;

export const LogoTitleContainer = styled.h1`
  color: black;
  font-size: 2.5rem;
`;

export const Menu = styled.div`
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

export const CustomMenu = styled(MenuIcon)`
  color: black;
  font-size: 4rem; /* Adjust the size as needed */
  cursor: pointer;

  @media only screen and (min-width: 992px) {
    display: none !important;
  }
`;