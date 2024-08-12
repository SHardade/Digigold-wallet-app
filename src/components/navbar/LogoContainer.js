import React from 'react';
import './logoContainer.css';
import Wallet from '../wallet/Wallet';

const LogoContainer = ({userId}) => {
  return (
    <div className="section">
      <div className="logo">
        <h1>digi<span>GOLD</span></h1>
      </div>
      <div className="wallet">
        <Wallet userId={userId}/>  
      </div>
    </div>
  );
}

export default LogoContainer;
