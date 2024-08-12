import React, { useState, useEffect } from 'react';
import './allFetch.css';
import axios from 'axios';

const AllPayments = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        let response;
        switch (filterType) {
          case 'paymentId':
            response = await axios.get(`http://localhost:8080/api/v1/payments/${filterValue}`);
            setFilteredPayments([response.data]);
            break;
          case 'userId':
            response = await axios.get(`http://localhost:8080/api/v1/payments/by_user/${filterValue}`);
            setFilteredPayments(response.data);
            break;
          case 'successful':
            response = await axios.get(`http://localhost:8080/api/v1/payments/successful`);
            setFilteredPayments(response.data);
            break;
          case 'failed':
            response = await axios.get(`http://localhost:8080/api/v1/payments/failed`);
            setFilteredPayments(response.data);
            break;
          case 'paymentmethod':
            response = await axios.get(`http://localhost:8080/api/v1/payments/by_payment_method/${filterValue}`);
            setFilteredPayments(response.data);
            break;
          default:
            response = await axios.get('http://localhost:8080/api/v1/payments/');
            setFilteredPayments(response.data);
            break;
        }
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, [filterType, filterValue]);

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    setFilterValue('');
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Payment List</h1>
      <div className="fetch-filter-dropdown">
        <label htmlFor="filterType">Filter by: </label>
        <select id="filterType" value={filterType} onChange={handleFilterTypeChange}>
          <option value="all">All Payments</option>
          <option value="paymentId">Payment ID</option>
          <option value="userId">User ID</option>
          <option value="successful">Successful Payments</option>
          <option value="failed">Failed Payments</option>
          <option value="paymentmethod">Payment Method</option>
        </select>
        {filterType !== 'all' && filterType !== 'successful' && filterType !== 'failed' && (
          <>
            <br />
            <label htmlFor="filterValue">
              {filterType === 'userId' ? 'Enter User ID' : filterType === 'paymentmethod' ? 'Enter Payment Method' : 'Enter Filter Value'}:
            </label>
            <input
              type="text"
              id="filterValue"
              value={filterValue}
              onChange={handleFilterValueChange}
              placeholder={
                filterType === 'userId' ? 'Enter User ID' : filterType === 'paymentmethod' ? 'Enter Payment Method' : 'Enter Filter Value'
              }
            />
          </>
        )}
      </div>
      <table style={tableStyle} className="fetch-table">
        <thead>
          <tr>
            <th style={cellStyle}>Payment ID</th>
            <th style={cellStyle}>Amount</th>
            <th style={cellStyle}>Date Time</th>
            <th style={cellStyle}>Payment Method</th>
            <th style={cellStyle}>Payment Status</th>
            <th style={cellStyle}>Transaction Type</th>
            <th style={cellStyle}>User ID</th>
          </tr>
        </thead>
        <tbody>
          {filteredPayments.map(payment => (
            <tr key={payment.paymentId}>
              <td style={cellStyle}>{payment.paymentId}</td>
              <td style={cellStyle}>{payment.amount}</td>
              <td style={cellStyle}>{payment.created_at}</td>
              <td style={cellStyle}>{payment.payment_method}</td>
              <td style={cellStyle}>{payment.payment_status}</td>
              <td style={cellStyle}>{payment.transaction_type}</td>
              <td style={cellStyle}>{payment.UserId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableStyle = {
  borderCollapse: 'collapse',
  width: '80%',
  margin: 'auto',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const cellStyle = {
  border: '1px solid #ddd',
  padding: '12px',
  textAlign: 'center',
};

export default AllPayments;
