import React from 'react';
import Nav from '../navbar/Nav';
import LogoContainer from '../navbar/LogoContainer';
import Footer from '../footer/Footer';
import BuyHero from './BuyHero';
import BuyGold from './BuyGold';
import BuySteps from './BuySteps';
import FAQComponent from '../faq/FAQComponent';

const Buy = () => {

    return (
        <div>
            <LogoContainer />
            <Nav />
            <BuyHero />
            <BuyGold />
            <BuySteps />
            <FAQComponent />
            <Footer />
        </div>
    );
};

export default Buy;

