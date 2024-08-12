import React, { useState, useEffect } from 'react';
import './allFetch.css';
import axios from 'axios';

const AllVendorBranches = () => {
  const [branches, setBranches] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        let response;
        switch (filterType) {
          case 'branchId':
            response = await axios.get(`http://localhost:8080/api/v1/vendor_branches/${filterValue}`);
            setBranches([response.data]);
            break;
          case 'byVendorID':
            response = await axios.get(`http://localhost:8080/api/v1/vendor_branches/by_vendor/${filterValue}`);
            setBranches(response.data);
            break;
          case 'byCity':
            response = await axios.get(`http://localhost:8080/api/v1/vendor_branches/by_city/${filterValue}`);
            setBranches(response.data);
            break;
          case 'byState':
            response = await axios.get(`http://localhost:8080/api/v1/vendor_branches/by_state/${filterValue}`);
            setBranches(response.data);
            break;
          case 'byCountry':
            response = await axios.get(`http://localhost:8080/api/v1/vendor_branches/by_country/${filterValue}`);
            setBranches(response.data);
            break;
          default:
            response = await axios.get('http://localhost:8080/api/v1/vendor_branches/');
            setBranches(response.data);
            break;
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();
  }, [filterType, filterValue]);

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Vendor Branches List</h1>
      <div className="fetch-filter-dropdown">
        <label htmlFor="filterType">Filter by: </label>
        <select id="filterType" value={filterType} onChange={handleFilterTypeChange}>
          <option value="all">All Vendor Branches</option>
          <option value="branchId">Branch ID</option>
          <option value="byVendorID">Vendor ID</option>
          <option value="byCity">City</option>
          <option value="byState">State</option>
          <option value="byCountry">Country</option>
        </select>
        {filterType !== 'all' && (
          <>
            <br />
            <label htmlFor="filterValue">{getFilterLabel(filterType)}: </label>
            <input
              type="text"
              id="filterValue"
              value={filterValue}
              onChange={handleFilterValueChange}
              placeholder={getFilterLabel(filterType)}
            />
          </>
        )}
      </div>
      <table style={tableStyle} className="fetch-table">
        <thead>
          <tr>
            <th style={cellStyle}>Branch ID</th>
            <th style={cellStyle}>Created At</th>
            <th style={cellStyle}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {branches.map(branch => (
            <tr key={branch.branchId}>
              <td style={cellStyle}>{branch.branchId}</td>
              <td style={cellStyle}>{branch.created_at}</td>
              <td style={cellStyle}>{branch.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const getFilterLabel = (filterType) => {
  switch (filterType) {
    case 'branchId':
      return 'Enter Branch ID';
    case 'byVendorID':
      return 'Enter Vendor ID';
    case 'byCity':
      return 'Enter City';
    case 'byState':
      return 'Enter State';
    case 'byCountry':
      return 'Enter Country';
    default:
      return '';
  }
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

export default AllVendorBranches;
