import React, { useState, useEffect } from 'react';
import { TfiWallet } from "react-icons/tfi";
import axios from 'axios';
import './wallet.css';

const Wallet = ({ userId }) => {
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('User'));
        if(currentUser && currentUser.userId){
        axios.get(`http://localhost:8080/api/v1/users/check_balance/${currentUser.userId}`)
          .then(response => {
            setBalance(response.data);
            return axios.get(`http://localhost:8080/api/v1/users/check_balance/${currentUser.userId}`);
          })
          .then(balanceResponse => {
            setBalance(balanceResponse.data);
          })
          .catch(error => {
            console.error('Error fetching profile data:', error);
          });
        }
    }, [userId]); 

    return (
        <div className="wallet">
            <div className="wallet-balance-container">
                <span className='wallet-icon'><TfiWallet /></span><p>Wallet Balance</p><br/>
            </div>
            <span className='wallet-balance-value'>{balance !== null ? `₹${parseFloat(balance).toFixed(2)}` : `₹${0}`}</span>
        </div>
    );
}

export default Wallet;
