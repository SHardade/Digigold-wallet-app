import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import HeroImage1 from '../../images/hero/heroimg1.jpg';
import HeroImage2 from '../../images/hero/heroimg2.jpg';
import HeroImage3 from '../../images/hero/heroimg3.avif';
import './buyHero.css';

function BuyHero() {
  return (
      <div>
        <Carousel>
          <Carousel.Item>
            <img style={{ height: '90vh' }}
              className='d-block w-100'
              src={HeroImage1}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Start Investing in Gold</h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img style={{ height: '90vh' }}
              className='d-block w-100'
              src={HeroImage2}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Your gold investment is just a click away</h3>
              <p></p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img style={{ height: '90vh' }}
              className='d-block w-100'
              src={HeroImage3}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Bringing convenience for you</h3>
              <p>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
  )
}

export default BuyHero;
