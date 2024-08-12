import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../navbar/Nav';
import LogoContainer from '../navbar/LogoContainer';
import Footer from '../footer/Footer';
import './jewelleryConversion.css';
import Image1 from '../../images/jewelleryConversion/conversion.jpg';
 
const JewelleryConversions = () => {
  return (
    <>
      <LogoContainer />
      <Nav />
      <div className="jewellery-conversions" style={{alignItems:"center", marginTop:"60px", marginBottom:"80px"}}>
        <h2 className="title" style={{color:"#571613", fontSize:"30px"}}>Convert Your DigiGold To Jewellery</h2>
        <img src={Image1} alt="Jewellery" className="image" />
        <p className="description">&nbsp;&nbsp;
          Redeem your DigiGold Wallet with just a click! This feature empowers
          you to transform your digital investment into stunning, wearable jewellery pieces
          of the same value. Enjoy a simple process where you can choose from our vast
          gold collection. Experience the full value of your investment and flaunt
          it with pride.
        </p>
        <Link to="/ecommerce" className="convert-button" >Convert Now</Link>
      </div>
      <Footer />
    </>
  );
};
 
export default JewelleryConversions;