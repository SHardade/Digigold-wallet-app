import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllVirtualGoldHolding = () => {
  const [filteredHoldings, setFilteredHoldings] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [filterValue, setFilterValue] = useState('');
  const [userId, setUserId] = useState('');
  const [vendorId, setVendorId] = useState('');

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        let response;
        switch (filterType) {
          case 'holderId':
            response = await axios.get(`http://localhost:8080/api/v1/virtual_gold_holding/${filterValue}`);
            setFilteredHoldings([response.data]);
            break;
          case 'byUserId':
            response = await axios.get(`http://localhost:8080/api/v1/virtual_gold_holding/users/${filterValue}`);
            setFilteredHoldings(response.data);
            break;
          case 'byUserAndVendor':
            response = await axios.get(`http://localhost:8080/api/v1/virtual_gold_holding/byUserAndVendor/${userId}/${vendorId}`);
            setFilteredHoldings(response.data);
            break;
          default:
            response = await axios.get('http://localhost:8080/api/v1/virtual_gold_holding');
            setFilteredHoldings(response.data);
            break;
        }
      } catch (error) {
        console.error('Error fetching virtual gold holdings:', error);
      }
    };

    fetchHoldings();
  }, [filterType, filterValue, userId, vendorId]);

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleVendorIdChange = (event) => {
    setVendorId(event.target.value);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Virtual Gold Holding List</h1>
      <div>
        <label htmlFor="filterType">Filter by: </label>
        <select id="filterType" value={filterType} onChange={handleFilterTypeChange}>
          <option value="all">All Holdings</option>
          <option value="holderId">Holder ID</option>
          <option value="byUserId">User ID</option>
          <option value="byUserAndVendor">User and Vendor ID</option>
        </select>
        {filterType === 'byUserAndVendor' && (
          <>
            <br />
            <label htmlFor="userId">User ID: </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={handleUserIdChange}
              placeholder="Enter User ID"
            />
            <label htmlFor="vendorId">Vendor ID: </label>
            <input
              type="text"
              id="vendorId"
              value={vendorId}
              onChange={handleVendorIdChange}
              placeholder="Enter Vendor ID"
            />
          </>
        )}
        {filterType !== 'all' && filterType !== 'byUserAndVendor' && (
          <>
            <br />
            <label htmlFor="filterValue">{filterType === 'holderId' ? 'Enter Holder ID' : 'Enter User ID'}: </label>
            <input
              type="text"
              id="filterValue"
              value={filterValue}
              onChange={handleFilterValueChange}
              placeholder={filterType === 'holderId' ? 'Enter Holder ID' : 'Enter User ID'}
            />
          </>
        )}
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>Holding ID</th>
            <th style={cellStyle}>Date</th>
            <th style={cellStyle}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {filteredHoldings.map(holding => (
            <tr key={holding.holdingId}>
              <td style={cellStyle}>{holding.holdingId}</td>
              <td style={cellStyle}>{holding.createdAt}</td>
              <td style={cellStyle}>{holding.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableStyle = {
  border: '1px solid #ddd',
  borderCollapse: 'collapse',
  margin: 'auto',
};

const cellStyle = {
  padding: '8px',
  textAlign: 'center',
  border: '1px solid #ddd',
};

export default AllVirtualGoldHolding;
