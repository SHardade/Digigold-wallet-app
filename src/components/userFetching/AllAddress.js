import React, { useState, useEffect } from 'react';
import './allFetch.css';
import axios from 'axios';

const AllAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/address/');
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, []);

  const handleFilterTypeChange = (event) => {
    const value = event.target.value;
    setFilterType(value);
    if (value === 'all') {
      setShowTextInput(false);
      setSelectedAddressId('');
    } else {
      setShowTextInput(true);
    }
  };

  const handleAddressChange = (event) => {
    setSelectedAddressId(event.target.value);
  };

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        if (selectedAddressId !== '') {
          const response = await axios.get(`http://localhost:8080/api/v1/address/${selectedAddressId}`);
          setSelectedAddress(response.data);
        } else {
          setSelectedAddress(null);
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    fetchAddress();
  }, [selectedAddressId]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Address List</h1>
      <div className="fetch-filter-dropdown">
        <label htmlFor="filterType">Filter by: </label>
        <select id="filterType" value={filterType} onChange={handleFilterTypeChange}>
          <option value="all">Show All Addresses</option>
          <option value="byAddressId">By Address ID</option>
        </select>
        {showTextInput && (
          <>
            <br />
            <label htmlFor="addressId">Enter Address ID: </label>
            <input
              type="text"
              id="addressId"
              value={selectedAddressId}
              onChange={handleAddressChange}
              placeholder="Enter Address ID"
            />
          </>
        )}
      </div>
      <table style={tableStyle} className="fetch-table">
        <thead>
          <tr>
            <th style={cellStyle}>Address ID</th>
            <th style={cellStyle}>Street</th>
            <th style={cellStyle}>City</th>
            <th style={cellStyle}>State</th>
            <th style={cellStyle}>Country</th>
          </tr>
        </thead>
        <tbody>
          {filterType === 'all' ? (
            addresses.map(address => (
              <tr key={address.addressId}>
                <td style={cellStyle}>{address.addressId}</td>
                <td style={cellStyle}>{address.street}</td>
                <td style={cellStyle}>{address.city}</td>
                <td style={cellStyle}>{address.state}</td>
                <td style={cellStyle}>{address.country}</td>
              </tr>
            ))
          ) : (
            selectedAddress && (
              <tr key={selectedAddress.addressId}>
                <td style={cellStyle}>{selectedAddress.addressId}</td>
                <td style={cellStyle}>{selectedAddress.street}</td>
                <td style={cellStyle}>{selectedAddress.city}</td>
                <td style={cellStyle}>{selectedAddress.state}</td>
                <td style={cellStyle}>{selectedAddress.country}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

const tableStyle = {
  borderCollapse: 'collapse',
  width: '80%',
  margin: '0 auto',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const cellStyle = {
  border: '1px solid #ddd',
  padding: '12px',
  textAlign: 'left',
};

export default AllAddress;
