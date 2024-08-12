import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Nav from '../navbar/Nav';
import LogoContainer from '../navbar/LogoContainer';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import './login.css';
 
const Login = ({ userId }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
 
  const [inputError, setInputError] = useState({
    email: '',
    password: ''
  });
 
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    setInputError({
      email: '',
      password: ''
    });
 
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/users/search/${formData.email}`);
      const userData = response.data;
      if (formData.email === 'admin@example.com' && formData.password === '@Admin123') {
        toast.success('Admin logged in successfully');
        navigate("/adminDashboard");
      }
      else if (userData.password === formData.password) {
        localStorage.setItem('User', JSON.stringify(userData));
        toast.success('User logged in successfully');
        navigate("/dashboard")
      } else {
        setInputError({ password: 'Invalid password' });
        toast.error('User log in failed');
      }
    } catch (error) {
      setInputError({ email: 'Invalid email or password' });
      toast.error('Invalid email or password');
    }
  };
 
  return (
    <>
      <LogoContainer />
      <Nav />
      <div className="login-form" style={{alignItems:"center", marginTop:"30px", marginBottom:"30px"}}>
        <form onSubmit={handleSubmit} noValidate>
          <h2 className="login-heading">Login</h2>
          <div className="error-message">
            {inputError.email && <div>{inputError.email}</div>}
            {inputError.password && <div>{inputError.password}</div>}
          </div>
          <div className="login-form-group">
            <label>Email address<span className="required">*</span></label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="login-form-group">
            <label>Password<span className="required">*</span></label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-login">Login</button>&nbsp;
          <div>
            <Link to="/signUp" style={{alignItems:"center", marginLeft:"18%", fontWeight:"bold", color:"black"}}>Don't have an account?</Link>
          </div>
        </form>
      </div>
 
      <Footer />
    </>
  );
};
 
export default Login;