import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
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
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Assuming you have your Firebase configuration in this file


function CheckoutPage() {
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

  // Calculate the total price of all products in the cart
  const subtotalPrice = productsData.reduce(
    (total, product) => total + parseFloat(product.product.productPrice),
    0
  );

  const shipping = 3;
  const Total = subtotalPrice + shipping;

  function sendWhatsAppMessage(phoneNumber, message) {
    // Encode the phone number and message for the URL
    const encodedPhoneNumber = encodeURIComponent(phoneNumber);
    const encodedMessage = encodeURIComponent(message);

    // Construct the WhatsApp URL
    const whatsappURL = `https://wa.me/${encodedPhoneNumber}?text=${encodedMessage}`;

    // Open the WhatsApp URL in a new tab or window
    window.open(whatsappURL, '_blank');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any required field is missing
    const requiredFields = ['country', 'firstName', 'lastName', 'phoneNumber', 'address', 'city', 'postalCode'];
    const missingFields = requiredFields.filter(field => !shippingInfo[field]);

    if (missingFields.length > 0) {
      alert(`Please fill out the following fields: ${missingFields.join(', ')}`);
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
        subtotal: subtotalPrice,
        shipping: shipping,
        total: Total,
      },
    };

    async function addOrderToFirestore() {
      try {
        const docRef = await addDoc(collection(db, 'orders'), orderData);
        console.log('Document written with ID: ', docRef.id);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }

    addOrderToFirestore();

    // Construct the WhatsApp message with all the information
    const message = `
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
    
    Products
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
    Subtotal: $${subtotalPrice}
    Shipping: $${shipping}
    Total: $${Total}
  `;

    // Replace 'PHONE_NUMBER_HERE' with the actual phone number
    sendWhatsAppMessage('78803034', message);
  };

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
                  <h3>USD {product.product.productPrice} $</h3>
                </div>
              </ProductCard>
            ))}
            <PriceRow>
              <h2>Subtotal</h2>
              <h3>${subtotalPrice}</h3>
            </PriceRow>
            <PriceRow>
              <h2>Shipping</h2>
              <h3>${shipping}</h3>
            </PriceRow>
            <PriceRow>
              <h2>Total</h2>
              <h3>${Total}</h3>
            </PriceRow>
            <MatButton
              name="Place Order"
              onClick={handleSubmit}
              width="100%"
            ></MatButton>
          </Form>
        </CardContainer>
      </CenteredCheckoutPage>
    </div>
  );
}

export default CheckoutPage;
