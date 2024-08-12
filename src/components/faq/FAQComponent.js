import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import './faqComponent.css';

const FAQComponent = ({ data }) => {

  return (
    <div>
      <h1 className="text-center mt-5 faq">Frequently Asked Questions</h1>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header className='question'>1. What is digital gold?</Accordion.Header>
          <Accordion.Body className='answer'>
            Digital gold typically refers to cryptocurrencies, with Bitcoin being the most prominent example. It's called digital gold because, like gold, it's seen as a store of value and a hedge against economic uncertainty.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header className='question'>2. What is live gold price?</Accordion.Header>
          <Accordion.Body className='answer'>
            Live gold price means the gold rate in Indian Rupees (INR) per gram of (999.9) fine gold as posted from time to time, exclusive of product manufacturing/making charges and delivery charges. The rate is based on the international price of gold, the USD-INR exchange rate and applicable customs duty.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header className='question'>3. How long is the live price valid for completing a transaction?</Accordion.Header>
          <Accordion.Body className='answer'>
            The live price, at which you choose to buy/sell Gold, will be valid for 4-5 minutes from the time you click on the option to buy. In case you fail to complete the transaction during this time-frame, you will be redirected to the new live price, at which point you can restart the transaction to make a fresh offer to buy. In case the amount is deducted, the amount will be refunded to the customer account within 5-7 working days.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default FAQComponent;
