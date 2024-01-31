import React from 'react';
import { Card,CardMedia } from '../Styles/mediacardstyles';



const ProductCard = ({ height, width, image }) => {
  return (
    <Card width={width} style={{margin:"10px"}}>
      <CardMedia
        height={height}
        src={image}
        alt="St John"
      />
    </Card>
  );
};

export default ProductCard;
