import React, { useState, useEffect } from 'react';
import './allFetch.css';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response;
        switch (filterType) {
          case 'userId':
            response = await axios.get(`http://localhost:8080/api/v1/users/${filterValue}`);
            setFilteredUsers([response.data]);
            break;
          case 'byCity':
            response = await axios.get(`http://localhost:8080/api/v1/users/by_city/${filterValue}`);
            setFilteredUsers(response.data);
            break;
          case 'byState':
            response = await axios.get(`http://localhost:8080/api/v1/users/by_state/${filterValue}`);
            setFilteredUsers(response.data);
            break;
          default:
            response = await axios.get('http://localhost:8080/api/v1/users');
            setFilteredUsers(response.data);
            break;
        }
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [filterType, filterValue]);

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>User List</h1>
      <div className="fetch-filter-dropdown">
        <label htmlFor="filterType">Filter by: </label>
        <select id="filterType" value={filterType} onChange={handleFilterTypeChange}>
          <option value="all">All Users</option>
          <option value="userId">User ID</option>
          <option value="byCity">City</option>
          <option value="byState">State</option>
        </select>
        {filterType !== 'all' && (
          <>
            <br />
            <label htmlFor="filterValue">
              {filterType === 'userId' ? 'Enter User ID' : filterType === 'byCity' ? 'Enter City' : 'Enter State'}: 
            </label>
            <input
              type="text"
              id="filterValue"
              value={filterValue}
              onChange={handleFilterValueChange}
              placeholder={filterType === 'userId' ? 'Enter User ID' : filterType === 'byCity' ? 'Enter City' : 'Enter State'}
            />
          </>
        )}
      </div>
      <table style={tableStyle} className="fetch-table">
        <thead>
          <tr>
            <th style={cellStyle}>User ID</th>
            <th style={cellStyle}>Name</th>
            <th style={cellStyle}>Balance</th>
            <th style={cellStyle}>Created At</th>
            <th style={cellStyle}>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.userId}>
              <td style={cellStyle}>{user.userId}</td>
              <td style={cellStyle}>{user.name}</td>
              <td style={cellStyle}>{user.balance}</td>
              <td style={cellStyle}>{user.created_at}</td>
              <td style={cellStyle}>{user.email}</td>
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

export default AllUsers;
