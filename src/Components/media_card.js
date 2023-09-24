import React from 'react';

// Import styled-components
import styled from 'styled-components';

// Create a styled Card component
const Card = styled.div`
  margin: 10px;
  border-radius: 10px;
  height: auto;
  width: ${(props) => props.width};
  cursor: pointer;
  transition: transform 0.4s ease;
  box-shadow: 0px 0px 5px rgba(128, 128, 128, 0.2);
  overflow: hidden;

  img{
    height: 100%;
  }
  &:hover {
    transform: scale(1.03);
  }

  @media only screen and (min-width: 320px) and (max-width: 479px){ 
    width: 90%;
    height: 50vh;
   }

  @media only screen and (min-width: 480px) and (max-width: 767px){ 
        
    }
`;

// Create a styled CardMedia component
const CardMedia = styled.img`
  object-fit: cover;
  height: ${(props) => props.height};
  width: 100%;
  border-radius: 10px;
`;

const ProductCard = ({ height, width, image }) => {
  return (
    <Card width={width}>
      <CardMedia
        height={height}
        src={image}
        alt="St John"
      />
    </Card>
  );
};

export default ProductCard;