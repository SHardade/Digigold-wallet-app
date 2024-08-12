import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import SignUp from './components/signUp/SignUp';
import Login from './components/signUp/Login';
import Dashboard from './components/dashboard/Dashboard';
import Sidebar from './components/sideBar/Sidebar';
import SellGold from './components/sell/SellGold';
import TransactionHistory from './components/transactionHistory/TransactionHistory';
import Buy from './components/buy/buy';
import JewelleryConversion from './components/conversion/JewelleryConversion';
import WalletPage from './components/wallet/WalletPage';
import Ecommerce from './components/ecommerce/Ecommerce';
import CartPage from './components/ecommerce/CartPage';
import UserProfile from './components/user/UserProfile';
import Loader from './components/loader/Loader'; 
import VendorSignUp from './components/vendor/VendorSignUp';
import AllAddress from './components/userFetching/AllAddress';
import AllPayments from './components/userFetching/AllPayments';
import AllPhysicalGoldTransactions from './components/userFetching/AllPhysicalGoldTransactions';
import AllUsers from './components/userFetching/AllUsers';
import AllVendorBranches from './components/userFetching/AllVendorBranches';
import AllVendors from './components/userFetching/AllVendors';
import AllVirtualGoldHolding from './components/userFetching/AllVirtualGoldHolding';
import Invoice from './components/payments/Invoice';
import PaymentGateway from './components/payments/PaymentGateway';
import AdminDashboard from './components/admin/AdminDashboard';
import Address from './components/address/Address';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const userId=2;

  useEffect(() => {
    const setLoadingState = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000); 
    };

    setLoadingState();
  }, []);

  return (
    <BrowserRouter>
      <Sidebar>
        {loading && <Loader />}
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/signIn" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard userId={userId}/>} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<SellGold />} />
          <Route path="/wallet" element={<WalletPage userId={userId}/>} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/transaction" element={<TransactionHistory />} />
          <Route path='/conversion' element={<JewelleryConversion />} />
          <Route path="/payment" element={<PaymentGateway />} />
          <Route path="/ecommerce" element={<Ecommerce addToCart={setCartItems} />} />
          <Route path="/vendor" element={<VendorSignUp />} />
          <Route path="/ecommerce" element={<Ecommerce />}/>
          <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
          <Route path="/user" element={<UserProfile userId={userId}/>} />
          <Route path="/address" element={<Address userId={userId}/>} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          {/* Routes to fetching data from API */}
          <Route path="/fetch/address" element={<AllAddress />} />
          <Route path="/fetch/payments" element={<AllPayments />} />
          <Route path="/fetch/physicalGoldTransactions" element={<AllPhysicalGoldTransactions />} />
          <Route path="/fetch/users" element={<AllUsers />} />
          <Route path="/fetch/vendorBranches" element={<AllVendorBranches />} />
          <Route path="/fetch/vendors" element={<AllVendors />} />
          <Route path="/fetch/virtualGoldHolding" element={<AllVirtualGoldHolding />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
