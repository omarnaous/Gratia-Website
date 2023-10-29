import styled from "styled-components";
import CustomTextfield from "../Components/CustomTextfield";
import MaterialButton from "../Components/MaterialButton";

export const CenteredCheckoutPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
  margin-bottom: 3%;
  overflow: hidden;
`;


export const CardContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: calc(50%);

  @media only screen and (min-width: 320px) and (max-width: 479px){ 
    width:100% ;
    
}

  @media only screen and (min-width: 480px) and (max-width: 767px){ width:100% }

  @media only screen and (min-width: 768px) and (max-width: 991px){ width:100%; height:100% }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  padding: 15px;
  width: 100%;
`;

export const SpacedCustomTextfield = styled(CustomTextfield)`
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 0px;
  width: ${(props) => (props.inRow ? '20vw' : '100%')};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;



export const RadioCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  width: 100%;
`;

export const RadioLabel = styled.label`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  color: black !important;
`;

export const RadioInput = styled.input`
  cursor: pointer;
  height: 20px;
  margin: 5px;
  accent-color: black;
`;


export const MatButton = styled(MaterialButton)`
width: 100%;
margin-top: 10px;
`;

// Create a styled component for the product card
export const ProductCard = styled.div`
display: flex;
align-items: center;
width: 100%;
background-color: white;
margin-top: 10px;
margin-bottom: 10px;
`;

export const ProductImage = styled.img`
height: 100px;
width: 100px; 
object-fit: cover;
border-radius: 0px;
margin-right: 10px;
border-radius: 5px;

`;

export const PriceRow = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
margin-top: 10px;
margin-bottom: 10px;

`