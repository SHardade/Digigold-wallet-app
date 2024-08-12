import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './buySteps.css';

function BuySteps() {
    return (
        <div>
            <h1 className="text-center mt-5" style={{color: '#262626', fontSize: '26px'}}>How it works?</h1>
            <p className="lead text-center mb-5" style={{color: '#262626', fontSize: '16px'}}>We've made buying a gold as easy and simple as possible.</p>
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="buy" title="Buy"  >
                    <CardGroup style={{
                        background: '#fffaee'
                    }}>
                        <Card style={{
                            background: '#fffaee',
                            border: 'none'
                        }}>
                            <Card.Body>
                                <div className='step_container'>
                                    Step <span>01</span>
                                </div>
                                <Card.Title style={{color: '#262626', fontSize: '18px', textAlign: 'center'}}>Login</Card.Title>
                                <Card.Text style={{fontSize: '14px', textAlign: 'center'}}>
                                    Login or register with digigold. Complete your account setup.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                        <Card style={{
                            background: '#fffaee',
                            border: 'none'
                        }}>
                            <Card.Body>
                                <div className='step_container'>
                                    Step <span>02</span>
                                </div>
                                <Card.Title style={{color: '#262626', fontSize: '18px', textAlign: 'center'}}>Enter Amount</Card.Title>
                                <Card.Text style={{fontSize: '14px', textAlign: 'center'}}>
                                    Enter your amount in rupees or gold in grams to buy.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                        <Card style={{
                            background: '#fffaee',
                            border: 'none'
                        }}>
                            <Card.Body>
                                <div className='step_container'>
                                    Step <span>03</span>
                                </div>
                                <Card.Title style={{color: '#262626', fontSize: '18px', textAlign: 'center'}}>Payment</Card.Title>
                                <Card.Text style={{fontSize: '14px', textAlign: 'center'}}>
                                    Choose your payment method. You will have multiple payment options to choose from such as an account, card, or wallet.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                    </CardGroup>
                </Tab>
                <Tab eventKey="sell" title="Sell">
                    <CardGroup style={{
                        background: '#fffaee'
                    }}>
                        <Card style={{
                            background: '#fffaee',
                            border: 'none'
                        }}>
                            <Card.Body>
                                <div className='step_container'>
                                    Step <span>01</span>
                                </div>
                                <Card.Title style={{color: '#262626', fontSize: '18px', textAlign: 'center'}}>Enter Amount</Card.Title>
                                <Card.Text style={{fontSize: '14px', textAlign: 'center'}}>
                                    Enter the amount in rupees or gold in grams to sell.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                        <Card style={{
                            background: '#fffaee',
                            border: 'none'
                        }}>
                            <Card.Body>
                                <div className='step_container'>
                                    Step <span>02</span>
                                </div>
                                <Card.Title style={{color: '#262626', fontSize: '18px', textAlign: 'center'}}>Bank Details</Card.Title>
                                <Card.Text style={{fontSize: '14px', textAlign: 'center'}}>
                                    Fill in the bank details. We'll be verifying your bank account details.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                        <Card style={{
                            background: '#fffaee',
                            border: 'none'
                        }}>
                            <Card.Body>
                                <div className='step_container'>
                                    Step <span>03</span>
                                </div>
                                <Card.Title style={{color: '#262626', fontSize: '18px', textAlign: 'center'}}>Amount Credit</Card.Title>
                                <Card.Text style={{fontSize: '14px', textAlign: 'center'}}>
                                    Once the transaction is successful, the gold sold amount will be credited to the bank account within 2-3 working days.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                    </CardGroup>
                </Tab>
            </Tabs>
        </div>
    );
}

export default BuySteps;
