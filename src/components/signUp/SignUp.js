import React, { useState } from 'react';
import { Form, FormGroup, FormFeedback, Label, Input, Button, Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import Nav from '../navbar/Nav';
import LogoContainer from '../navbar/LogoContainer';
import Footer from '../footer/Footer';
import 'react-toastify/dist/ReactToastify.css';
import './signUp.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
const SignUp = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    balance: '',
    city: '',
    postalCode: '',
    street: '',
    state: '',
    country: '',
    confirmPassword: ''
  });

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/addUserAddress', user);
      if (response.status === 200 || response.status==201) {
        toast.success('User registered successfully');
        setUser({
          email: '',
          password: '',
          name: '',
          balance: '',
          city: '',
          postalCode: '',
          street: '',
          state: '',
          country: '',
          confirmPassword: ''
        });
      } else {
        toast.error('Failed to register user');
      }
    } catch (error) {
      toast.error('Error occurred while registering user');
      setError({
        errors: error,
        isError: true,
      });
    }
  };

  return (
    <>
      <LogoContainer />
      <Nav />
      <div className="register-page">
        <div className="register-form">
          <h2 className="register-heading">Register</h2>

          <Form onSubmit={handleSubmit} className="user-form">
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter name"
                    value={user.name}
                    onChange={handleChange}
                    invalid={error.errors?.response?.data?.name ? true : false}
                  />
                  <FormFeedback>
                    {error.errors?.response?.data?.name}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    value={user.email}
                    onChange={handleChange}
                    invalid={error.errors?.response?.data?.email ? true : false}
                  />
                  <FormFeedback>
                    {error.errors?.response?.data?.email}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    value={user.password}
                    onChange={handleChange}
                    invalid={error.errors?.response?.data?.password ? true : false}
                  />
                  <FormFeedback>
                    {error.errors?.response?.data?.password}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="confirmPassword">Confirm Password</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    invalid={error.errors?.response?.data?.confirmPassword ? true : false}
                  />
                  <FormFeedback>
                    {error.errors?.response?.data?.confirmPassword}
                  </FormFeedback>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="street">Street</Label>
                  <Input
                    type="text"
                    name="street"
                    id="street"
                    placeholder="Enter street"
                    value={user.street}
                    onChange={handleChange}
                    invalid={error.errors?.response?.data?.street ? true : false}
                  />
                  <FormFeedback>
                    {error.errors?.response?.data?.street}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="city">City</Label>
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter city"
                    value={user.city}
                    onChange={handleChange}
                    invalid={error.errors?.response?.data?.city ? true : false}
                  />
                  <FormFeedback>
                    {error.errors?.response?.data?.city}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="state">State</Label>
                  <Input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="Enter state"
                    value={user.state}
                    onChange={handleChange}
                    invalid={error.errors?.response?.data?.state ? true : false}
                  />
                  <FormFeedback>
                    {error.errors?.response?.data?.state}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="country">Country</Label>
                  <Input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Enter country"
                    value={user.country}
                    onChange={handleChange}
                    invalid={error.errors?.response?.data?.country ? true : false}
                  />
                  <FormFeedback>
                    {error.errors?.response?.data?.country}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="postalCode">Postal Code</Label>
                  <Input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    placeholder="Enter postal code"
                    value={user.postalCode}
                    onChange={handleChange}
                    invalid={error.errors?.response?.data?.postalCode ? true : false}
                  />
                  <FormFeedback>
                    {error.errors?.response?.data?.postalCode}
                  </FormFeedback>
                </FormGroup>
              </Col>
            </Row>
            <button type="submit" className="btn-register">
              Register
            </button>&nbsp;
            <div>
            <Link to="/signin" style={{alignItems:"center", marginLeft:"18%", fontWeight:"bold", color:"black"}}>Already have an account?</Link>
          </div>       
          </Form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SignUp;