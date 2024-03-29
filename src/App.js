import './App.css';
import { Route, Routes } from "react-router-dom";
import HomePage from './Pages/HomePage';
import ProductDetail from './Pages/ProductDetail';
import SignInForm from './Pages/SignInForm';
import AdminPanel from './Pages/adminpanel';
import Addproducts from './Pages/Addproducts';
import EditProducts from './Pages/EditProducts';
import AddCategory from './Pages/AddCategory';
import ResponsiveProductsGrid from './Pages/grid';
import EditBanner from './Pages/EditBanner';
import CheckOutPage from './Pages/Checkout.js';
import MyTableComponent from './Pages/orderPage';
import UserOrders from './Pages/userorders';
import Newhome from './Pages/Newhome';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/Home" element={<Newhome />} />
      <Route path="/Detail" element={<ProductDetail />} />
      <Route path="/SignIn" element={<SignInForm />} />
      {/* <Route path="/Admin" element={<AdminPanel />} /> */}
      <Route path="/AddP" element={<Addproducts />} />
      <Route path="/EditProducts" element={<EditProducts />} />
      <Route path="/AddCategory" element={<AddCategory />} />
      <Route path="/ProductsPage" element={<ResponsiveProductsGrid />} />
      <Route path="/Banner" element={<EditBanner />} />
      <Route path="/Check" element={<CheckOutPage />} />
      <Route path="/Orders*@LMS" element={<MyTableComponent />} />
      <Route path="/UserOrders" element={<UserOrders />} />

    </Routes>
  );
}

export default App;
