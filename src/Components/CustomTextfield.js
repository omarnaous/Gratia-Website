import React from 'react';
import styled from 'styled-components';

const CustomTextfield = styled(({ multiline, labelColor, borderColor, width, ...rest }) =>
  multiline ? <textarea {...rest} /> : <input {...rest} />
)`
  /* Your styles here */
  border: 1px solid ${props => props.borderColor || '#ccc'}; /* Change border color to grey */
  padding: 10px;
  font-size: 16px;
  width: ${props => props.width || '300px'}; /* Set width based on the prop or default to 300px */
  transition: box-shadow 0.3s ease; /* Add transition for elevation effect */

  /* Elevation effect on focus */
  &:focus {
    outline: none;
    border-color: ${props => props.borderColor || '#ccc'}; /* Change border color on focus */
    box-shadow: ${props => props.elevation ? '0 0 8px rgba(0, 0, 0, 0.2)' : 'none'}; /* Add elevation on focus */
  }
`;

const ReusableTextField = ({ id, label, color, multiline, onChange, width, ...props }) => {
  // Handle change event and call the provided onChange callback
  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <CustomTextfield
      id={id}
      placeholder={label}
      borderColor={color}
      size="large"
      fullWidth
      multiline={multiline}
      rows={multiline ? 3 : undefined}
      width={width} // Pass the width prop to the CustomTextfield component
      onChange={handleChange} // Call handleChange for change event
      {...props}
    />
  );
};

export default ReusableTextField;
