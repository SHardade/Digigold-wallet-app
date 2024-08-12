import React, { useEffect, useState } from 'react';
import Nav from '../navbar/Nav';
import LogoContainer from '../navbar/LogoContainer';
import Footer from '../footer/Footer';
import axios from 'axios';
import './invoice.css';

const Invoice = () => {
    const [quantity, setQuantity] = useState(1);
    const [currentGoldPrice, setCurrentGoldPrice] = useState(0);
    const [showInvoice, setShowInvoice] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/vendor/price')
            .then(response => {
                setCurrentGoldPrice(response.data);
            })
            .catch(error => {
                console.error('Error fetching current gold price:', error);
            });
    }, []);

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const generateInvoice = () => {
        console.log(`Invoice generated for ${quantity} grams of digital gold.`);
        setShowInvoice(true);
    };

    return (
        <>
            <LogoContainer />
            <Nav />
            <div className="gold-invoice" style={{alignItems:"center", marginTop:"60px", marginBottom:"2%"}}>
                <h2 className="title" style={{color:"#571613"}}>Buy Digital Gold</h2>
                <p className="quantity">Quantity: {quantity} grams</p>
                <div className="buttons">
                    <button className="btn" onClick={decreaseQuantity}>-</button>
                    <button className="btn" onClick={increaseQuantity}>+</button>
                </div>
                <button className="generate-btn" onClick={generateInvoice}>Generate Invoice</button>

                {showInvoice && (
                    <div className="invoice-details">
                        <h3>Invoice Details</h3>
                        <p>Quantity: {quantity} grams</p>
                        <p>Price per gram: ₹{currentGoldPrice}/gm</p>
                        <p>Total Price: ₹{quantity * currentGoldPrice}</p>
                        <p>Payment Method: Credit Card</p>
                        <p>Delivery Method: Email</p>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Invoice;
