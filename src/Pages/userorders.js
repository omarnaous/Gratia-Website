import React, { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

const UserOrders = ({ userId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "orders", "T6Ofl3xeBGVK8GicdMvganFORsB2");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data().ordersList);
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.length === 0 ? (
        <p>No items ordered.</p>
      ) : (
        data.map((order, index) => (
          <div key={index} style={orderCardStyle}>
            <div style={titleStyle}>
            <h4>Ordered At: {order.orderDate}</h4>
            <h4>Total: USD {order.orderSummary.total.toFixed(0)}</h4>
            </div>
  
            <div style={productContainerStyle}>
              {order.products.map((product, productIndex) => (
                <img
                  key={productIndex}
                  src={product.image}
                  style={productImageStyle}
                  alt=""
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const orderCardStyle = {
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '16px',
  boxShadow: '0px 0px 5px rgba(128, 128, 128, 0.2',
  borderRadius: '5px',
};

const titleStyle ={
  marginBottom: '16px',
}



const productContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
};

const productImageStyle = {
  height: '100px',
  width: '100px',
  borderRadius: '5px',
  objectFit: 'cover',
  boxShadow: '0px 0px 5px rgba(128, 128, 128, 0.2',

};

export default UserOrders;
