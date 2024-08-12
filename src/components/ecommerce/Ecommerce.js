import React, { useState } from 'react';
import { Button, Card, Navbar, Badge, Dropdown, DropdownToggle, Container, DropdownMenu } from 'react-bootstrap';
import image1 from '../../images/ecom/ring.png';
import image2 from '../../images/ecom/earrings.png';
import image3 from '../../images/ecom/bracelets.png';
import image4 from '../../images/ecom/bracelets1.png';
import image5 from '../../images/ecom/necklace.png';
import image6 from '../../images/ecom/bangles.png';
import image7 from '../../images/ecom/bracelets2.png';
import image8 from '../../images/ecom/mangalsutra.png';
import image9 from '../../images/ecom/pendant.png';
import image10 from '../../images/ecom/earrings1.png';
import image11 from '../../images/ecom/shopping.webp';
import image12 from '../../images/ecom/shopping1.webp';
import { HiOutlineShoppingBag } from "react-icons/hi2";
 
import { BsCart2 } from "react-icons/bs";
import { TfiWallet } from "react-icons/tfi";
import { TbArrowsTransferDown } from "react-icons/tb";
import { PiArrowsCounterClockwiseLight } from "react-icons/pi";
import { FiLogIn } from "react-icons/fi";
import { RiUserFollowLine } from "react-icons/ri";
import { HiOutlineUserAdd } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { Link, Navigate } from 'react-router-dom';
import LogoContainer from '../navbar/LogoContainer';
import Footer from '../footer/Footer';

const Ecommerce = ({ addToCart }) => {
    const [cartItems, setCartItems] = useState([]);

    const products = [
        {
            image: image1,
            name: 'The Gold Ring',
            price: '52,146',
        },
        {
            image: image2,
            name: 'Starlight Solitaire Detachable Stub Earrings',
            price: '86,954',
        },
        {
            image: image3,
            name: 'Car Baby Nazaria Gold Bracelet',
            price: '10,016',
        },
        {
            image: image4,
            name: 'Alisha Floral Spiral Diamond Bracelet',
            price: '97,409',
        },
        {
            image: image5,
            name: 'The Almire Necklace',
            price: '1,88,840',
        },
        {
            image: image6,
            name: 'Galia Stamped Gemstone Bracelet',
            price: '96,129',
        },
        {
            image: image7,
            name: 'Leila Cutout Pearl Bracelet',
            price: '48,298',
        },
        {
            image: image8,
            name: 'Chayla Leafy Gold Mangalsutra',
            price: '35,146',
        },
        {
            image: image9,
            name: 'Halo Medallion Solitaire Pendant',
            price: '64,404',
        },
        {
            image: image10,
            name: 'Niharika Diamond Drop Earrings',
            price: '33,022',
        },
        {
            image: image11,
            name: '	Necklace Gold ',
            price: '55,022',
        },
        {
            image: image12,
            name: 'Traditional Gold Plated Necklace',
            price: '1,20,222',
        }
    ];
    const handleAddToCart = (product) => {
        setCartItems([...cartItems, product]);
        addToCart([...cartItems, product]);
    };
 
    return (
        <>
            <nav className="navbar" style={{ height: "60px", backgroundColor: "#571613" }}>
                <h2 style={{color:"white"}}>digiGold</h2>
                <div style={{marginLeft:"60%"}}> {/* Use ml-auto to align items to the right */}
                <Link to="/vendor">
                            <Button style={{ color: "white", width: "100px", backgroundColor: "#571613", borderColor: "#571613" }}>Vendor</Button>
                        </Link>
                    </div>                   
    <div style={{marginRight:"10%"}}> {/* Use d-flex for display: flex and justify-content-end to align items to the right */}
        
        <Dropdown >
            <DropdownToggle style={{backgroundColor:"#571613",borderColor:"#571613"}}>
                <FaShoppingCart fontSize="25px" />
                <Badge  style={{backgroundColor:"#571613",borderColor:"#571613"}}>{cartItems.length}</Badge>
            </DropdownToggle>
            <DropdownMenu style={{ minWidth: 300, alignItems: "left" }}>
                {cartItems.length > 0 ? (
                    <div>
                        {cartItems.map((item, index) => (
                            <div key={index} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
                                <img src={item.image} alt={item.name} style={{ height: '100px', objectFit: 'cover' }} />
                                <div style={{ marginTop: '10px' }}>
                                    <span>{item.name}</span><br />
                                    <span>{item.price}</span>
                                </div>
                            </div>
                        ))}
                        <Link to='/cart' style={{ marginTop: '10px' }}>
                            <Button style={{alignSelf: 'flex-end', width: "50%", backgroundColor:"#571613"}}>Go to Cart</Button>
                        </Link>
                    </div>
                ) : (
                    <div style={{ padding: '10px' }}>
                        <span>No items in cart</span>
                    </div>
                )}
            </DropdownMenu>
        </Dropdown>
    </div>
</nav>
 
            <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: "10%", marginTop: "10px" }}>
    {products.map((product, index) => (
        <Card key={index} style={{ width: '18rem', marginRight: '20px', marginBottom: '20px' }}>
            <Card.Img variant="top" src={product.image} style={{ height: '200px', objectFit: 'cover' }} />
            <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '200px' }}>
                <div>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>Price: Rs.{product.price}</Card.Text>
                </div>
                <Button  onClick={() => handleAddToCart(product)} style={{ alignSelf: 'flex-end', width: "50%", backgroundColor:"#571613" }}>Add to Cart</Button>
            </Card.Body>
        </Card>
    ))}
</div>
 
 
            <Footer />
        </>
    );
};
 
export default Ecommerce;