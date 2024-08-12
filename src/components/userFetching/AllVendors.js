import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [filterValue, setFilterValue] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/vendor/');
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    fetchVendors();
  }, []);

  const handleFilterTypeChange = (event) => {
    const value = event.target.value;
    setFilterType(value);
    if (value === 'all') {
      setShowTextInput(false);
      setFilterValue('');
    } else {
      setShowTextInput(true);
    }
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        if (filterValue !== '') {
          let response;
          if (filterType === 'byVendorId') {
            response = await axios.get(`http://localhost:8080/api/v1/vendor/${filterValue}`);
          } else if (filterType === 'byName') {
            response = await axios.get(`http://localhost:8080/api/v1/vendor/name/${filterValue}`);
          }
          setSelectedVendor(response.data);
        } else {
          setSelectedVendor(null);
        }
      } catch (error) {
        console.error('Error fetching vendor:', error);
      }
    };

    fetchVendor();
  }, [filterValue, filterType]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Vendor List</h1>
      <div>
        <label htmlFor="filterType">Filter by: </label>
        <select id="filterType" value={filterType} onChange={handleFilterTypeChange}>
          <option value="all">Show All Vendors</option>
          <option value="byVendorId">By Vendor ID</option>
          <option value="byName">By Name</option>
        </select>
        {showTextInput && (
          <>
            <br />
            <label htmlFor="filterValue">Enter {filterType === 'byVendorId' ? 'Vendor ID' : 'Vendor Name'}: </label>
            <input
              type="text"
              id="filterValue"
              value={filterValue}
              onChange={handleFilterValueChange}
              placeholder={filterType === 'byVendorId' ? 'Enter Vendor ID' : 'Enter Vendor Name'}
            />
          </>
        )}
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={cellStyle}>Vendor ID</th>
            <th style={cellStyle}>Contact Email</th>
            <th style={cellStyle}>Contact Person Name</th>
            <th style={cellStyle}>Contact Phone</th>
            <th style={cellStyle}>Date Time</th>
            <th style={cellStyle}>Current Gold Price</th>
            <th style={cellStyle}>Description</th>
            <th style={cellStyle}>Total Gold Quantity</th>
            <th style={cellStyle}>Vendor Name</th>
            <th style={cellStyle}>Website URL</th>
          </tr>
        </thead>
        <tbody>
          {filterType === 'all' && vendors.map(vendor => (
            <tr key={vendor.vendorId}>
              <td style={cellStyle}>{vendor.vendorId}</td>
              <td style={cellStyle}>{vendor.contactEmail}</td>
              <td style={cellStyle}>{vendor.contactPersonName}</td>
              <td style={cellStyle}>{vendor.contactPhone}</td>
              <td style={cellStyle}>{vendor.createdAt}</td>
              <td style={cellStyle}>{vendor.currentGoldPrice}</td>
              <td style={cellStyle}>{vendor.description}</td>
              <td style={cellStyle}>{vendor.totalGoldQuantity}</td>
              <td style={cellStyle}>{vendor.vendorName}</td>
              <td style={cellStyle}>{vendor.websiteUrl}</td>
            </tr>
          ))}
          {selectedVendor && (
            <tr key={selectedVendor.vendorId}>
              <td style={cellStyle}>{selectedVendor.vendorId}</td>
              <td style={cellStyle}>{selectedVendor.contactEmail}</td>
              <td style={cellStyle}>{selectedVendor.contactPersonName}</td>
              <td style={cellStyle}>{selectedVendor.contactPhone}</td>
              <td style={cellStyle}>{selectedVendor.createdAt}</td>
              <td style={cellStyle}>{selectedVendor.currentGoldPrice}</td>
              <td style={cellStyle}>{selectedVendor.description}</td>
              <td style={cellStyle}>{selectedVendor.totalGoldQuantity}</td>
              <td style={cellStyle}>{selectedVendor.vendorName}</td>
              <td style={cellStyle}>{selectedVendor.websiteUrl}</td>
            </tr>
          )}
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

export default AllVendors;
