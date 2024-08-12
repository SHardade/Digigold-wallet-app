import React from 'react';
import { Link } from 'react-router-dom';
import './adminDashboard.css';
 
const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="card-container">
        <div className="card">
          <Link to="/fetch/address" className="card-link">All Addresses</Link>
        </div>
        <div className="card">
          <Link to="/fetch/payments" className="card-link">All Payments</Link>
        </div>
        <div className="card">
          <Link to="/fetch/physicalGoldTransactions" className="card-link">All Physical Gold Transactions</Link>
        </div>
        <div className="card">
          <Link to="/fetch/users" className="card-link">All Users</Link>
        </div>
        <div className="card">
          <Link to="/fetch/vendorBranches" className="card-link">All Vendor Branches</Link>
        </div>
        <div className="card">
          <Link to="/fetch/vendors" className="card-link">All Vendors</Link>
        </div>
        <div className="card">
          <Link to="/fetch/virtualGoldHolding" className="card-link">All Virtual Gold Holdings</Link>
        </div>
      </div>
    </div>
  );
};
 
export default AdminDashboard;