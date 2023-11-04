import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Navbar from '../Components/Navbar';

const MyTableComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const ordersQuery = query(collection(db, 'orders'), orderBy('orderDate', 'desc'));
      const querySnapshot = await getDocs(ordersQuery);
      const orders = [];

      querySnapshot.forEach((doc) => {
        const order = doc.data();
        orders.push(order);
      });

      setData(orders);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', height: '100vh', marginTop: "5vh" }}>
        <TableContainer component={Paper} style={{ width: '80%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Date</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Order Products</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.firstName} {order.lastName}</TableCell>
                  <TableCell>{order.phoneNumber}</TableCell>
                  <TableCell>
                  {order.country}   {`${order.address}, ${order.city}, ${order.postalCode}`}
                  </TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>
                    {order.products.map((product, productIndex) => (
                      <div key={productIndex}>
                        <p>Name: {product.name}</p>
                        <p>Price: {product.price}</p>
                        <img height="100px" width="100px" src={product.image} alt={product.name} />
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default MyTableComponent;
