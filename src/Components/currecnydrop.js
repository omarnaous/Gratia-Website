import React, { useState, useEffect } from 'react';
import data from '../Assets/currency.json'; // Import your JSON data

const selectStyle = {
  display: 'block',
  border: 'none',
  background: 'none',
  appearance: 'none', // Remove default arrow icon
  fontSize: 'inherit',
  padding: 0,
  margin: 0,
  cursor: 'pointer',
  width: '5vw',
  outline: 'none', // Remove outline when focused
};

function CurrencyDropdown() {
  const [selectedCurrency, setSelectedCurrency] = useState(
    localStorage.getItem('selectedCurrency') || data[0].currencyName
  );
  const [selectedCode, setSelectedCode] = useState(
    localStorage.getItem('selectedCode') || data[0].currencyCode
  );
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    // Save the selected currency name and code to local storage whenever they change
    localStorage.setItem('selectedCurrency', selectedCurrency);
    localStorage.setItem('selectedCode', selectedCode);
  }, [selectedCurrency, selectedCode]);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSelectChange = (e) => {
    const newCurrencyName = e.target.value;
    const newCurrency = data.find((currency) => currency.currencyName === newCurrencyName);
    if (newCurrency) {
      setSelectedCurrency(newCurrencyName);
      setSelectedCode(newCurrency.currencyCode);
    }
    toggleDropdown();

    window.location.reload();
  };

  return (
    <div style={{marginLeft:"3px"}}>
      <select
        style={selectStyle}
        value={selectedCurrency}
        onChange={handleSelectChange}
      >
        {data.map((currency, index) => (
          // Check if the currencyName is not null or undefined before rendering
          currency.currencyName ? (
            <option key={index} value={currency.currencyName}>
              <img src={currency.icon} style={{height:"100px",width:"100px"}} alt="" />
              {" "+currency.currencyCode.toUpperCase()}
            </option>
          ) : null
        ))}
      </select>
    </div>
  );
}

export default CurrencyDropdown;
