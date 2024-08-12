import React, { useState, useEffect } from 'react';
import './allFetch.css';
import axios from 'axios';

const AllPhysicalGoldTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let response;
        switch (filterType) {
          case 'transactionId':
            response = await axios.get(`http://localhost:8080/api/v1/physical_gold_transactions/${filterValue}`);
            setFilteredTransactions([response.data]);
            break;
          case 'userId':
            response = await axios.get(`http://localhost:8080/api/v1/physical_gold_transactions/byUser/${filterValue}`);
            setFilteredTransactions(response.data);
            break;
          case 'branchId':
            response = await axios.get(`http://localhost:8080/api/v1/physical_gold_transactions/by_branch/${filterValue}`);
            setFilteredTransactions(response.data);
            break;
          case 'byCity':
            response = await axios.get(`http://localhost:8080/api/v1/physical_gold_transactions/by_delivery_city/${filterValue}`);
            setFilteredTransactions(response.data);
            break;
          case 'byState':
            response = await axios.get(`http://localhost:8080/api/v1/physical_gold_transactions/by_delivery_state/${filterValue}`);
            setFilteredTransactions(response.data);
            break;
          default:
            response = await axios.get('http://localhost:8080/api/v1/physical_gold_transactions');
            setFilteredTransactions(response.data);
            break;
        }
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching physical gold transactions:', error);
      }
    };

    fetchTransactions();
  }, [filterType, filterValue]);

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Physical Gold Transaction List</h1>
      <div className="fetch-filter-dropdown">
        <label htmlFor="filterType">Filter by: </label>
        <select id="filterType" value={filterType} onChange={handleFilterTypeChange}>
          <option value="all">All Transactions</option>
          <option value="transactionId">Transaction ID</option>
          <option value="userId">User ID</option>
          <option value="branchId">Branch ID</option>
          <option value="byCity">City</option>
          <option value="byState">State</option>
        </select>
        {filterType !== 'all' && (
          <>
            <br />
            <label htmlFor="filterValue">
              {filterType === 'userId' ? 'Enter User ID' : filterType === 'branchId' ? 'Enter Branch ID' : 'Enter Filter Value'}:
            </label>
            <input
              type="text"
              id="filterValue"
              value={filterValue}
              onChange={handleFilterValueChange}
              placeholder={filterType === 'userId' ? 'Enter User ID' : filterType === 'branchId' ? 'Enter Branch ID' : 'Enter Filter Value'}
            />
          </>
        )}
      </div>
      <table style={tableStyle} className="fetch-table">
        <thead>
          <tr>
            <th style={cellStyle}>Transaction ID</th>
            <th style={cellStyle}>Date Time</th>
            <th style={cellStyle}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(transaction => (
            <tr key={transaction.transactionId}>
              <td style={cellStyle}>{transaction.transactionId}</td>
              <td style={cellStyle}>{transaction.createdAt}</td>
              <td style={cellStyle}>{transaction.quantity}</td>
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

export default AllPhysicalGoldTransactions;
