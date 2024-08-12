import React, { useState, useEffect } from 'react';
import Nav from '../navbar/Nav';
import LogoContainer from '../navbar/LogoContainer';
import Footer from '../footer/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Address = ({ userId }) => {
    const [addressData, setAddressData] = useState(null);
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });
    const navigate = useNavigate();
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('User'));
        if (currentUser && currentUser.userId) {
          axios.get(`http://localhost:8080/api/v1/address/${currentUser.userId}`)
            .then(response => {
                setAddressData(response.data);
                setFormData(response.data);
            })
            .catch(error => {
              console.error('Error fetching balance data:', error);
            });
        }
      }, [userId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentUser = JSON.parse(localStorage.getItem('User'));
            if (currentUser && currentUser.userId) {
            const response = await axios.put(`http://localhost:8080/api/v1/address/update/${currentUser.userId}`, formData);
            if (response.status === 200) {
                alert('Address data updated successfully');
                navigate('/user');
            } else {
                throw new Error('Failed to update address data');
            }
        }
        } catch (error) {
            console.error('Error updating address data:', error.message);
        }
    };
    if (!addressData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <LogoContainer />
            <Nav />
            <div className="user-profile-container">
                <form>
                    <div>
                        <label><b>Street:</b></label><br />
                        <input type="text" name="street" value={formData.street} onChange={handleChange} className="user-profile-input" />
                    </div>
                    <div>
                        <label><b>City:</b></label><br />
                        <input type="text" name="city" value={formData.city} onChange={handleChange} className="user-profile-input" />
                    </div>
                    <div>
                        <label><b>State:</b></label><br />
                        <input type="text" name="state" value={formData.state} onChange={handleChange} className="user-profile-input" />
                    </div>
                    <div>
                        <label><b>Postal Code:</b></label><br />
                        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="user-profile-input" />
                    </div>
                    <div>
                        <label><b>Country:</b></label><br />
                        <input type="text" name="country" value={formData.country} onChange={handleChange} className="user-profile-input" />
                    </div>
                    <button onClick={handleSubmit}>Update</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Address;
