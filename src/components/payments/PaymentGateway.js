import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../navbar/Nav';
import LogoContainer from '../navbar/LogoContainer';
import Footer from '../footer/Footer';
import CardsImage from '../../images/payment/cards.jpg';
import './paymentGateway.css';

const PaymentGateway = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: ''
  });

  const [submissionMessage, setSubmissionMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (formData[key] === '') {
        setSubmissionMessage(alert('Please fill in all the fields.'));
        return;
      }
    }
    // Card Number Validation
    if (!/^\d{12}$/.test(formData.cardNumber)) {
      setSubmissionMessage(alert('Invalid Card Number. Please enter a 12-digit number.'));
      return;
    }
    // Email Validation
    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
      setSubmissionMessage(alert('Invalid Email Address. Please enter a valid email.'));
      return;
    }
    // Exp Month Validation
    const expMonth = parseInt(formData.expMonth, 10);
    if (expMonth < 1 || expMonth > 12 || isNaN(expMonth)) {
      setSubmissionMessage(alert('Invalid Expiry Month. Please select a month between 1 and 12.'));
      return;
    }
    // Exp Year Validation
    const expYear = parseInt(formData.expYear, 10);
    if (expYear < 2023 || expYear > 2040 || isNaN(expYear)) {
      setSubmissionMessage(alert('Invalid Expiry Year. Please select a year between 2023 and 2040.'));
      return;
    }
    // CVV Validation
    if (!/^\d{3}$/.test(formData.cvv)) {
      setSubmissionMessage(alert('Invalid CVV. Please enter a 3-digit CVV.'));
      return;
    }
    setSubmissionMessage('');
    console.log(formData);
    navigate('/dashboard');
    alert('Transaction successful!');
  };

  return (
    <>
      <LogoContainer />
      <Nav />
      <div className='payment-container'>
        <header>
          <div className='container'>
            <div className='left'>
              <h3 style={{ color: "#571613" }}>BILLING ADDRESS</h3>
              <form onSubmit={handleSubmit}>
                <label>
                  Full name
                  <input type='text' name='fullName' value={formData.fullName} onChange={handleInputChange} placeholder='Enter name' required />
                </label>&nbsp;
                <label>
                  Email
                  <input type='email' name='email' value={formData.email} onChange={handleInputChange} placeholder='Enter email' required />
                </label>&nbsp;
                <label>
                  Address
                  <input type='text' name='address' value={formData.address} onChange={handleInputChange} placeholder='Enter address' required />
                </label>&nbsp;
                <label>
                  City
                  <input type='text' name='city' value={formData.city} onChange={handleInputChange} placeholder='Enter City' required />
                </label>&nbsp;
                <div id='zip'>
                  <label>
                    State
                    <select name='state' value={formData.state} onChange={handleInputChange} required>
                      <option value=''>Choose State..</option>
                      <option value='Andaman and Nicobar Islands'>Andaman and Nicobar Islands</option>
                      <option value='Andhra Pradesh'>Andhra Pradesh</option>
                      <option value='Arunachal Pradesh'>Arunachal Pradesh</option>
                      <option value='Assam'>Assam</option>
                      <option value='Bihar'>Bihar</option>
                      <option value='Chandigarh'>Chandigarh</option>
                      <option value='Chhattisgarh'>Chhattisgarh</option>
                      <option value='Dadra and Nagar Haveli'>Dadra and Nagar Haveli</option>
                      <option value='Daman and Diu'>Daman and Diu</option>
                      <option value='Delhi'>Delhi</option>
                      <option value='Goa'>Goa</option>
                      <option value='Gujarat'>Gujarat</option>
                      <option value='Haryana'>Haryana</option>
                      <option value='Himachal Pradesh'>Himachal Pradesh</option>
                      <option value='Jammu and Kashmir'>Jammu and Kashmir</option>
                      <option value='Jharkhand'>Jharkhand</option>
                      <option value='Karnataka'>Karnataka</option>
                      <option value='Kerala'>Kerala</option>
                      <option value='Lakshadweep'>Lakshadweep</option>
                      <option value='Madhya Pradesh'>Madhya Pradesh</option>
                      <option value='Maharashtra'>Maharashtra</option>
                      <option value='Manipur'>Manipur</option>
                      <option value='Meghalaya'>Meghalaya</option>
                      <option value='Mizoram'>Mizoram</option>
                      <option value='Nagaland'>Nagaland</option>
                      <option value='Odisha'>Odisha</option>
                      <option value='Puducherry'>Puducherry</option>
                      <option value='Punjab'>Punjab</option>
                      <option value='Rajasthan'>Rajasthan</option>
                      <option value='Sikkim'>Sikkim</option>
                      <option value='Tamil Nadu'>Tamil Nadu</option>
                      <option value='Telangana'>Telangana</option>
                      <option value='Tripura'>Tripura</option>
                      <option value='Uttar Pradesh'>Uttar Pradesh</option>
                      <option value='Uttarakhand'>Uttarakhand</option>
                      <option value='West Bengal'>West Bengal</option>
                    </select>

                  </label>&nbsp;
                  <label>
                    Zip Code
                    <input type='number' name='zipCode' value={formData.zipCode} onChange={handleInputChange} placeholder='Zip Code' required />
                  </label>
                </div>
              </form>
            </div>
            <div className='right'>
              <h3 style={{ color: "#571613" }}>PAYMENT</h3>
              <form onSubmit={handleSubmit}>
                <label>
                  Accepted Cards<br />
                  <img src={CardsImage} alt='Accepted Cards' className='payment-image' />
                </label>
                <label>
                  Credit card number
                  <input type='text' name='cardNumber' value={formData.cardNumber} onChange={handleInputChange} placeholder='Enter card number' required />
                </label>
                <label>
                  Exp month
                  <select name='expMonth' value={formData.expMonth} onChange={handleInputChange} required>
                    <option value=''>Choose Month..</option>
                    <option value='1'>January</option>
                    <option value='2'>February</option>
                    <option value='3'>March</option>
                    <option value='4'>April</option>
                    <option value='5'>May</option>
                    <option value='6'>June</option>
                    <option value='7'>July</option>
                    <option value='8'>August</option>
                    <option value='9'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
                  </select>

                </label>
                <div id='zip'>
                  <label>
                    Exp year
                    <select name='expYear' value={formData.expYear} onChange={handleInputChange} required>
                      <option value=''>Choose Year..</option>
                      <option value='2023'>2023</option>
                      <option value='2024'>2024</option>
                      <option value='2025'>2025</option>
                      <option value='2026'>2026</option>
                      <option value='2027'>2027</option>
                      <option value='2028'>2028</option>
                      <option value='2029'>2029</option>
                      <option value='2030'>2030</option>
                      <option value='2031'>2031</option>
                      <option value='2032'>2032</option>
                      <option value='2033'>2033</option>
                      <option value='2034'>2034</option>
                      <option value='2035'>2035</option>
                      <option value='2036'>2036</option>
                      <option value='2037'>2037</option>
                      <option value='2038'>2038</option>
                      <option value='2039'>2039</option>
                      <option value='2040'>2040</option>
                    </select>

                  </label>&nbsp;
                  
                </div>
                <div>
                <label>
                    CVV<br/>
                    <input type='password' name='cvv' value={formData.cvv} onChange={handleInputChange} placeholder='CVV' required />
                  </label>
                  </div>
                <input type='submit' value='Proceed to pay' />
              </form>
            </div>
          </div>
        </header>
      </div>
      {submissionMessage && <div className="submission-message">{submissionMessage}</div>}
      <Footer />
    </>
  );
};

export default PaymentGateway;
