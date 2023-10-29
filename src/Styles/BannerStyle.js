import styled from "styled-components";

export const BannerContainer = styled.div`
  img {
    height: 70vh;
    width: 100%;
    border-radius: 10px;
  }
  border-radius: 10px;
  margin-top: 5vh;
  margin-left: 0.8vw;
  margin-right: 0.8vw;
  object-fit: fill;
  transition: transform 0.4s ease; // Slow down the transition
  &:hover {
    border-radius: 10px;
    transform: scale(1.03); // Remove single quotes and fix the syntax
  }


  @media only screen and (min-width: 320px) and (max-width: 479px){  
    img{
    height: 50vh;
    width: 100%;
    }
    margin-top: 3vh;
    margin-left: 2.5vw;
    margin-right: 2.5vw;
    object-fit: cover;
  }

  @media only screen and (min-width: 480px) and (max-width: 767px){ 
    img{
    height: 50vh;
    width: 100%;
    }
    margin-top: 3vh;
    margin-left: 2.5vw;
    margin-right: 2.5vw;
    object-fit: cover;
   }

  @media only screen and (min-width: 768px) and (max-width: 991px){ 
    margin-left: 12vw;
    margin-right: 12vw;
   }
`;