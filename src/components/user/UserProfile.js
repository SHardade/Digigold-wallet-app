import React, { useState, useEffect } from 'react';
import Nav from '../navbar/Nav';
import LogoContainer from '../navbar/LogoContainer';
import Footer from '../footer/Footer';
import axios from 'axios';
import ProfilePicture from '../../images/userProfile/user.jpg';
import './userProfile.css';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ userId }) => {
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        balance: 0,
        phoneNumber: '',
        profilePicture: ProfilePicture
    });
    const navigate = useNavigate();
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('User'));
        if (currentUser && currentUser.userId) {
            fetchData(currentUser.userId);
        }
    }, []);


    const fetchData = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}`);
            if (response.status !== 200) {
                throw new Error('Failed to fetch user data');
            }
            setUserData(response.data);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate('/address');
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <LogoContainer />
            <Nav />
            <div className="user-profile-container">
                <div className="profile-picture-container">
                    <img src={ProfilePicture} alt="Profile" className="profile-picture" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label><b>Name:</b></label><br />
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="user-profile-input" />
                    </div>
                    <div>
                        <label><b>Email:</b></label><br />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="user-profile-input" />
                    </div>
                    <div>
                        <label><b>Balance:</b></label><br />
                        <input type="text" name="balance" value={formData.balance} onChange={handleChange} className="user-profile-input" />
                    </div>

                    <button type="submit">Show More Details</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default UserProfile;