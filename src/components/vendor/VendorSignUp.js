import React, { useState } from 'react';
import { Form, FormGroup, FormFeedback, Label, Input, Button, Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './vendorSignUp.css';
import axios from 'axios';
import LogoContainer from '../navbar/LogoContainer';
import Footer from '../footer/Footer';


const VendorSignUp = () => {
  const [vendor, setVendor] = useState({
    vendorName: '',
    description: '',
    password: '',
    contactPersonName: '',
    contactEmail: '',
    contactPhone: '',
    websiteUrl: '',
    totalGoldQuantity: 0,
    currentGoldPrice: 0,
  });
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendor({ ...vendor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/v1/vendor/register', vendor);
      if (response.ok) {
        toast.success('Vendor registered successfully');
        setVendor({
          vendorName: '',
          description: '',
          password: '',
          contactPersonName: '',
          contactEmail: '',
          contactPhone: '',
          websiteUrl: '',
          totalGoldQuantity: 0,
          currentGoldPrice: 0,
        });
      } else {
        toast.error('Failed to register vendor');
      }
    } catch (error) {
      toast.error('Error occurred while registering vendor');
      setError({
        errors: error,
        isError: true,
      });
    }
  };

  return (
    <>
<LogoContainer />
    <div className="vendor-form-container" style={{alignItems:"center", marginTop:"60px", marginBottom:"80px"}}>
      <Form onSubmit={handleSubmit} className="vendor-form">
        <h2 style={{textAlign:"center", color:"#571613"}}>Vendor Registration</h2>&nbsp;
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="vendorName">Vendor Name</Label>
              <Input
                type="text"
                name="vendorName"
                id="vendorName"
                placeholder="Enter vendor name"
                value={vendor.vendorName}
                onChange={handleChange}
                invalid={
                  error.errors?.response?.data?.vendorName ? true : false
                }
              />
              <FormFeedback>
                {error.errors?.response?.data?.vendorName}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                placeholder="Enter description"
                value={vendor.description}
                onChange={handleChange}
                invalid={
                  error.errors?.response?.data?.description ? true : false
                }
              />
              <FormFeedback>
                {error.errors?.response?.data?.description}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value={vendor.password}
                onChange={handleChange}
                invalid={
                  error.errors?.response?.data?.password ? true : false
                }
              />
              <FormFeedback>
                {error.errors?.response?.data?.password}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="contactPersonName">Contact Person Name</Label>
              <Input
                type="text"
                name="contactPersonName"
                id="contactPersonName"
                placeholder="Enter contact person name"
                value={vendor.contactPersonName}
                onChange={handleChange}
                invalid={
                  error.errors?.response?.data?.contactPersonName ? true : false
                }
              />
              <FormFeedback>
                {error.errors?.response?.data?.contactPersonName}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="contactEmail">Contact Email</Label>
              <Input
                type="email"
                name="contactEmail"
                id="contactEmail"
                placeholder="Enter contact email"
                value={vendor.contactEmail}
                onChange={handleChange}
                invalid={
                  error.errors?.response?.data?.contactEmail ? true : false
                }
              />
              <FormFeedback>
                {error.errors?.response?.data?.contactEmail}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="contactPhone">Contact Phone</Label>
              <Input
                type="tel"
                name="contactPhone"
                id="contactPhone"
                placeholder="Enter contact phone"
                value={vendor.contactPhone}
                onChange={handleChange}
                invalid={
                  error.errors?.response?.data?.contactPhone ? true : false
                }
              />
              <FormFeedback>
                {error.errors?.response?.data?.contactPhone}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="websiteUrl">Website URL</Label>
              <Input
                type="url"
                name="websiteUrl"
                id="websiteUrl"
                placeholder="Enter website URL"
                value={vendor.websiteUrl}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="totalGoldQuantity">Total Gold Quantity</Label>
              <Input
                type="number"
                name="totalGoldQuantity"
                id="totalGoldQuantity"
                placeholder="Enter total gold quantity"
                value={vendor.totalGoldQuantity}
                onChange={handleChange}
                invalid={
                  error.errors?.response?.data?.totalGoldQuantity ? true : false
                }
              />
              <FormFeedback>
                {error.errors?.response?.data?.totalGoldQuantity}
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="currentGoldPrice">Current Gold Price</Label>
              <Input
                type="number"
                name="currentGoldPrice"
                id="currentGoldPrice"
                placeholder="Enter current gold price"
                value={vendor.currentGoldPrice}
                onChange={handleChange}
                invalid={
                  error.errors?.response?.data?.currentGoldPrice ? true : false
                }
              />
              <FormFeedback>
                {error.errors?.response?.data?.currentGoldPrice}
              </FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <Button>Submit</Button>
      </Form>
    </div>
    <Footer />
    </>
  );
};

export default VendorSignUp;
