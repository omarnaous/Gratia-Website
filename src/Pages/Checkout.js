import React, { useState } from 'react';

const CheckOutPage = () => {
  const [deliveryCountry, setDeliveryCountry] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // Default to COD

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can handle form submission logic here, e.g., sending the data to a server

    console.log('Delivery Country:', deliveryCountry);
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Address:', address);
    console.log('Payment Method:', paymentMethod);
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="deliveryCountry">Delivery Country:</label>
          <select
            id="deliveryCountry"
            value={deliveryCountry}
            onChange={(e) => setDeliveryCountry(e.target.value)}
            required
          >
            <option value="">Select a country</option>
            <option value="usa">USA</option>
            <option value="canada">Canada</option>
            {/* Add more countries */}
          </select>
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Full Address:</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Payment Method:</label>
          <div>
            <input
              type="radio"
              id="cod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={handlePaymentMethodChange}
            />
            <label htmlFor="cod">Cash on Delivery (COD)</label>
          </div>
          <div>
            <input
              type="radio"
              id="creditCard"
              value="creditCard"
              checked={paymentMethod === 'creditCard'}
              onChange={handlePaymentMethodChange}
            />
            <label htmlFor="creditCard">Credit Card</label>
          </div>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckOutPage;
