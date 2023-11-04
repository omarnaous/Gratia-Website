import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const MaterialButton = ({ onClick, name, icon, width,radius }) => {
  return (
    <button
      style={{
        padding: '20px',
        backgroundColor: 'black',
        marginTop: '10px', // Add marginTop here
        color: 'white',
        borderRadius:radius,
        width: width || 'auto', // Use the width prop if provided, or 'auto' by default
        border: 'none', // Remove default button border
        cursor: 'pointer', // Add pointer cursor on hover
        fontSize:"18px",
        fontWeight:"bold",
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon style={{ marginLeft: "5px", marginRight: "5px" }} icon={icon} />
      {name}
    </button>
  );
};

export default MaterialButton;
