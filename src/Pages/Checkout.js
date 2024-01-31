import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import styled from 'styled-components';
import {
  Form,
  CardContainer,
  CenteredCheckoutPage,
  ProductCard,
  ProductImage,
  RadioCard,
  RadioInput,
  RadioLabel,
  Row,
  SpacedCustomTextfield,
  MatButton,
  PriceRow,
} from '../Styles/CheckOutStyle';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming you have your Firebase configuration in this file
import emailjs from '@emailjs/browser';
import { CircularProgress } from '@mui/material';
import { auth } from '../firebase';
import { getDoc } from 'firebase/firestore';



function CheckoutPage() {
  const [user, setUser] = useState(null);

  const [shippingInfo, setShippingInfo] = useState({
    country: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardName: '',
    cardNumber: '',
    cvc: '',
  });

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    // Retrieve cart data from local storage
    const cartData = localStorage.getItem('cartData');
    if (cartData) {
      setProductsData(JSON.parse(cartData));
    }
  }, []); // This effect runs once when the component mounts

  const [selectedCode, setSelectedCode] = useState(localStorage.getItem('selectedCode') || "USD");

  const [rate, setRate] = useState(0);

  const cartKey = 'cartData'; // Key for storing cart data in local storage


  const checkAuthState = (callback) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        callback(user);
      } else {
        callback(null);
      }
    });
  };

  useEffect(() => {

    checkAuthState((authUser) => {
      setUser(authUser);
    });

    // Fetch currency rate
    fetch(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=596b192be02d41e1b86c2d6a92e56801&symbols=${selectedCode}`)
      .then((response) => response.json())
      .then((data) => setRate(data.rates[selectedCode]));

    // Fetch product data from Firestore
    const fetchData = async () => {
      try {

        const localData = JSON.parse(localStorage.getItem(cartKey)) || [];
        setProductsData([...localData,]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedCode]);

  // Calculate the total price of all products in the cart
  const subtotalPrice = productsData.reduce(
    (total, product) => total + parseFloat(product.product.productPrice) * rate,
    0
  );

  const shipping = 3 * rate;
  const Total = (subtotalPrice + shipping) * rate;


  const shippingwithoutrate = 3;

  const subtotalPricewithoutrate = productsData.reduce(
    (total, product) => total + parseFloat(product.product.productPrice),
    0
  );

  const Totalwithoutrate = (subtotalPricewithoutrate + shippingwithoutrate);




  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    // Check if any required field is missing
    const requiredFields = ['country', 'firstName', 'lastName', 'phoneNumber', 'address', 'city', 'postalCode'];
    const missingFields = requiredFields.filter(field => !shippingInfo[field]);

    if (missingFields.length > 0) {
      alert(`Please fill out the following fields: ${missingFields.join(', ')}`);
      setIsLoading(false); // Hide loading button
      return;
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    const orderData = {
      orderDate: formattedDate,
      country: shippingInfo.country,
      firstName: shippingInfo.firstName,
      lastName: shippingInfo.lastName,
      phoneNumber: shippingInfo.phoneNumber,
      address: shippingInfo.address,
      city: shippingInfo.city,
      postalCode: shippingInfo.postalCode,
      paymentMethod: paymentMethod,
      products: productsData.map((product, index) => ({
        name: product.product.productName,
        price: product.product.productPrice,
        image: product.product.images[0],
      })),
      orderSummary: {
        subtotal: subtotalPricewithoutrate,
        shipping: shippingwithoutrate,
        total: Totalwithoutrate,
      },
    };

    const message = `
    Order Date: ${formattedDate},
    Country: ${shippingInfo.country}
    First Name: ${shippingInfo.firstName}
    Last Name: ${shippingInfo.lastName}
    Phone Number: ${shippingInfo.phoneNumber}
    
    Full Address
    Address: ${shippingInfo.address}
    City: ${shippingInfo.city}
    Postal Code: ${shippingInfo.postalCode}
    
    Payment Method
    Method: ${paymentMethod}
    
    Products Ordered:
    ${productsData
        .map((product, index) => {
          return `
          ${index + 1}. ${product.product.productName}
          Price: USD ${product.product.productPrice}
          Image:${product.product.images[0]}
        `;
        })
        .join('\n')}
    
    Order Summary
    Subtotal: USD ${subtotalPricewithoutrate}
    Shipping: USD ${shippingwithoutrate}
    Total: USD ${Totalwithoutrate}
  `;

    try {
      // Create a reference to the document
      const docRef = doc(db, "orders", "T6Ofl3xeBGVK8GicdMvganFORsB2");

      // Get the document snapshot
      const docSnap = await getDoc(docRef);

      // Retrieve the current orders list from the document
      const ordersList = docSnap.data().ordersList || [];

      // Add the new order to the existing orders list
      ordersList.push(orderData);

      // Update the document with the modified orders list
      await setDoc(docRef, { ordersList });

      // Log the updated orders list
      console.log("Document data:", ordersList);

      // Log a success message
      console.log("Document updated successfully!");
    } catch (error) {
      console.error('Error updating document: ', error);
      setIsLoading(false); // Hide loading button
      return;
    }

    alert('Order Placed successfully!');

    try {
      var templateParams = {
        from_name: shippingInfo.firstName + ' ' + shippingInfo.lastName,
        message: message,
      };

      await emailjs.send('service_nf9e5db', 'template_sb6bw6s', templateParams, 'fVSBrYYSCBIuSkPV8');
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Email sending failed:', error);
      // You can handle the error as needed
    }

    setIsLoading(false); // Hide loading button
  };







  const CustomButton = styled.button`
  background-color: black;
  color: white;
  margin-top: 5px;
  padding: 15px 20px;
  border: none;
  cursor: pointer;
  border-radius: 0px;
  margin-top: 20px;
  width: 100%;
  font-size: 1.5rem;
  width: 100%;

  &:hover {
    background-color: #333;
  }
`;

  const [isLoading, setIsLoading] = useState(false);





  return (
    <div>
      <Navbar />
      <CenteredCheckoutPage>
        <CardContainer>
          <Form>
            <h3>Contact Information</h3>
            <SpacedCustomTextfield
              label="Country"
              name="country"
              value={shippingInfo.country}
              width="100%"
              onChange={handleShippingInfoChange}
              required
            />

            <Row>
              <SpacedCustomTextfield
                label="First Name"
                name="firstName"
                value={shippingInfo.firstName}
                onChange={handleShippingInfoChange}
                width="100%"
                required
              />
              <SpacedCustomTextfield
                label="Last Name"
                name="lastName"
                value={shippingInfo.lastName}
                onChange={handleShippingInfoChange}
                width="100%"
                required
              />
            </Row>

            <SpacedCustomTextfield
              label="Phone Number"
              name="phoneNumber"
              value={shippingInfo.phoneNumber}
              onChange={handleShippingInfoChange}
              width="100%"
              required
            />
            <h3>Full Address</h3>
            <SpacedCustomTextfield
              label="Address"
              name="address"
              value={shippingInfo.address}
              onChange={handleShippingInfoChange}
              width="100%"
              required
            />
            <Row>
              <SpacedCustomTextfield
                label="City"
                name="city"
                value={shippingInfo.city}
                onChange={handleShippingInfoChange}
                width="100%"
                required
              />
              <SpacedCustomTextfield
                label="Postal Code"
                name="postalCode"
                value={shippingInfo.postalCode}
                onChange={handleShippingInfoChange}
                width="100%"
                required
              />
            </Row>
            <h3>Payment Method</h3>
            <RadioCard>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  width="100%"
                  onChange={handlePaymentMethodChange}
                />
                Cash on Delivery (COD)
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="paymentMethod"
                  value="OMT / WISH"
                  checked={paymentMethod === 'OMT / WISH'}
                  onChange={handlePaymentMethodChange}
                />
                OMT / WISH
              </RadioLabel>
            </RadioCard>
            <h3>Order Summary</h3>
            {productsData.map((product, index) => (
              <ProductCard key={index}>
                <ProductImage src={product.product.images[0]} alt="" />
                <div>
                  <h2>{product.product.productName}</h2>
                  <h3>{selectedCode} {(product.product.productPrice * rate).toFixed(0)} $</h3>

                </div>
              </ProductCard>
            ))}
            <PriceRow>
              <h2>Subtotal</h2>
              <h3>{selectedCode} {subtotalPrice.toFixed(0)}</h3>
            </PriceRow>
            <PriceRow>
              <h2>Shipping</h2>
              <h3>{selectedCode} {shipping.toFixed(0)}</h3>
            </PriceRow>
            <PriceRow>
              <h2>Total</h2>
              <h3>{selectedCode} {Total.toFixed(0)}</h3>

            </PriceRow>
            <CustomButton type="submit" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Place Order'
              )}
            </CustomButton>
          </Form>
        </CardContainer>
      </CenteredCheckoutPage>
    </div>
  );
}

export default CheckoutPage;
