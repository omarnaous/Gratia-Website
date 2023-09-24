import React from 'react';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const MaterialButton = ({onClick,name,icon}) => {
  return (
    <Button
      variant="outlined"
      style={{
        margin:"10px",
        width: '330px', // Set your desired width here
        height: '50px', // Set your desired height here
        padding: '10px', // Set your desired padding here
        borderRadius: '5px', // Set your desired border radius here
        backgroundColor: 'black', // Set your desired background color here
        color: 'white', // Set your desired text color here
      }}
      onClick={onClick}
      startIcon={<FontAwesomeIcon style={{marginLeft:"5px",marginRight:"5px"}} icon={icon} />
    } // Add a shopping cart icon
    >
     {name}
    </Button>
  );
};

export default MaterialButton;
