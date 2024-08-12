import React, { useState } from 'react';
import axios from 'axios';
 
function AddUser() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    balance: 0,
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add user
      const response = await axios.post('/api/v1/users/register', user);
      console.log(response.data);
      // Add address
      const addressData = {
        street: user.street,
        city: user.city,
        state: user.state,
        postalCode: user.postalCode,
        country: user.country
      };
      const addressResponse = await axios.post('/api/v1/addresses/add', addressData);
      console.log(addressResponse.data);
      // Reset form
      setUser({
        email: '',
        password: '',
        name: '',
        balance: 0,
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
      });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
 
  return (
<div>
<h2>Add User</h2>
<form onSubmit={handleSubmit}>
<input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} />
<input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} />
<input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} />
<input type="number" name="balance" placeholder="Balance" value={user.balance} onChange={handleChange} />
<input type="text" name="street" placeholder="Street" value={user.street} onChange={handleChange} />
<input type="text" name="city" placeholder="City" value={user.city} onChange={handleChange} />
<input type="text" name="state" placeholder="State" value={user.state} onChange={handleChange} />
<input type="text" name="postalCode" placeholder="Postal Code" value={user.postalCode} onChange={handleChange} />
<input type="text" name="country" placeholder="Country" value={user.country} onChange={handleChange} />
<button type="submit">Add User</button>
</form>
</div>
  );
}
 
export default AddUser;