import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import { auth } from '../firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect } from 'react';
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

  const handleCreditCardInfoChange = (e) => {
    const { name, value } = e.target;
    setCreditCardInfo({ ...creditCardInfo, [name]: value });
  };

  const [productsData, setProductsData] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const q = query(collection(db, 'cart'), where('id', '==', user.uid));
        const querySnapshot = await getDocs(q);

        const products = [];
        querySnapshot.forEach((doc) => {
          products.push(doc.data().product);
        });

        setProductsData(products);
      }
    };

    fetchData();
  }, [user]);

  // Calculate the total price of all products in the cart
  const subtotalPrice = productsData.reduce(
    (total, product) => total + parseFloat(product.productPrice),
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

    // Construct the WhatsApp message with all the information
    const message = `
    *Contact Information*
    Country: ${shippingInfo.country}
    First Name: ${shippingInfo.firstName}
    Last Name: ${shippingInfo.lastName}
    Phone Number: ${shippingInfo.phoneNumber}
    
    *Full Address*
    Address: ${shippingInfo.address}
    City: ${shippingInfo.city}
    Postal Code: ${shippingInfo.postalCode}
    
    *Payment Method*
    Method: ${paymentMethod}
    
    *Products*
    ${productsData
      .map((product, index) => {
        return `
          ${index + 1}. ${product.productName}
          Price: USD ${product.productPrice}
          Image:${product.images[0]}
        `;
      })
      .join('\n')}
    
    *Order Summary*
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
              width="100%" // Set the width to 100%
              onChange={handleShippingInfoChange}
              required
            />

            <Row>
              <SpacedCustomTextfield
                label="First Name"
                name="firstName"
                value={shippingInfo.firstName}
                onChange={handleShippingInfoChange}
                width="100%" // Set the width to 100%
                required
              />
              <SpacedCustomTextfield
                label="Last Name"
                name="lastName"
                value={shippingInfo.lastName}
                onChange={handleShippingInfoChange}
                width="100%" // Set the width to 100%
                required
              />
            </Row>

            <SpacedCustomTextfield
              label="Phone Number"
              name="phoneNumber"
              value={shippingInfo.phoneNumber}
              onChange={handleShippingInfoChange}
              width="100%" // Set the width to 100%
              required
            />
            <h3>Full Address</h3>
            <SpacedCustomTextfield
              label="Address"
              name="address"
              value={shippingInfo.address}
              onChange={handleShippingInfoChange}
              width="100%" // Set the width to 100%
              required
            />
            <Row>
              <SpacedCustomTextfield
                label="City"
                name="city"
                value={shippingInfo.city}
                onChange={handleShippingInfoChange}
                width="100%" // Set the width to 100%
                required
              />
              <SpacedCustomTextfield
                label="Postal Code"
                name="postalCode"
                value={shippingInfo.postalCode}
                onChange={handleShippingInfoChange}
                width="100%" // Set the width to 100%
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
                  width="100%" // Set the width to 100%
                  onChange={handlePaymentMethodChange}
                />
                Cash on Delivery (COD)
              </RadioLabel>
              <RadioLabel>
                <RadioInput
                  type="radio"
                  name="paymentMethod"
                  value="CreditCard"
                  checked={paymentMethod === 'CreditCard'}
                  onChange={handlePaymentMethodChange}
                />
                Credit Card
              </RadioLabel>
            </RadioCard>
            {paymentMethod === 'CreditCard' && (
              <div>
                <h3>Credit Card Information</h3>
                <SpacedCustomTextfield
                  label="Full Card Name"
                  name="cardName"
                  value={creditCardInfo.cardName}
                  width="100%" // Set the width to 100%
                  onChange={handleCreditCardInfoChange}
                  required
                />
                <SpacedCustomTextfield
                  label="Card Number"
                  name="cardNumber"
                  value={creditCardInfo.cardNumber}
                  width="100%" // Set the width to 100%
                  onChange={handleCreditCardInfoChange}
                  required
                />
                <SpacedCustomTextfield
                  label="CVC"
                  name="cvc"
                  value={creditCardInfo.cvc}
                  width="100%" // Set the width to 100%
                  onChange={handleCreditCardInfoChange}
                  required
                />
              </div>
            )}
            <h3>Order Summary</h3>
            {productsData.map((product, index) => (
              <ProductCard key={index}>
                <ProductImage src={product.images[0]} alt="" />
                <div>
                  <h2>{product.productName}</h2>
                  <h3>USD {product.productPrice} $</h3>
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
