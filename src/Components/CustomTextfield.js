import React from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const CustomTextfield = styled(({ multiline, labelColor, borderColor, ...rest }) =>
  multiline ? <TextareaAutosize {...rest} /> : <TextField {...rest} />
)`
  /* Your styles here */

  & .MuiOutlinedInput-root {
    /* Set border color to black when active */
    &.Mui-focused fieldset {
      border-color: black;
    }
  }
`;

const ReusableTextField = ({ id, label, color, multiline, onChange, ...props }) => {
  // Handle change event and call the provided onChange callback
  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <CustomTextfield
      id={id}
      label={label}
      labelColor={color}
      borderColor={color}
      margin="dense"
      size="large"
      variant="outlined"
      fullWidth
      multiline={multiline}
      minRows={3}
      onChange={handleChange} // Call handleChange for change event
      InputLabelProps={{}} // Remove the label
      {...props}
    />
  );
};

export default ReusableTextField;
