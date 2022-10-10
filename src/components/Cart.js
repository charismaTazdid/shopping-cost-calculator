import React, { useEffect, useState } from 'react';
import { Button, Col, Form, ListGroup, Row, Image } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { CHANGE_CART_QTY, REMOVE_FROM_CART } from '../context/constant';
import { cartState } from '../context/Context'
import Rating from './Rating';



const Cart = () => {
    const { state: { cart }, dispatch } = cartState();

    const [total, setTotal] = useState(0);

    useEffect(() => {
        let totalPrice = cart.reduce((acc, crr) => acc + Number(crr.price) * crr.qty, 0)
        setTotal(totalPrice)
    }, [cart])


    return (
        <div className='home'>
            <div className='productContainer'>
                <ListGroup>
                    {
                        cart.map((item) => (
                            <ListGroup.Item key={item.id}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.images[0]} alt={item.title} fluid rounded />

                                    </Col>
                                    <Col md={2}>
                                        <span> <b>{item.title}</b> </span>
                                    </Col>
                                    <Col md={2}>
                                        <span> $ {item.price}</span>
                                    </Col>
                                    <Col md={2}>
                                        <Rating
                                            rating={Math.round(item.rating)}
                                            changeRating={() => { }}
                                            style={{ color: 'orange' }}
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control as={'select'} value={item.qty}
                                            onChange={(e) => dispatch({
                                                type: CHANGE_CART_QTY,
                                                payload: { id: item.id, qty: e.target.value }
                                            })}
                                        >

                                            {
                                                [...Array(item.stock).keys()].map((x) => (
                                                    <option key={x + 1}> {x + 1} </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>

                                    <Col md={2}>
                                        <Button type='button' variant='light'
                                            onClick={() => dispatch({ type: REMOVE_FROM_CART, payload: item })}
                                        >
                                            <AiFillDelete color='red' fontSize="20px" /> Delete
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                        ))
                    }
                </ListGroup>
            </div>
            <div className='filters summary' style={{backgroundColor: "#1c2023"}}>
                <span className='title'> Total Item: {cart.length}</span>

                {
                    cart.map((pd) => (
                        <span className='cartItem' key={pd.id}>
                            <img className='cartItemImg' src={pd.images[0]} alt={pd.title} />

                            <div className='cartItemDetail'>
                                <span> <b> {pd.title} </b></span>
                                <span> $ {pd.price}  x {pd.qty} = {pd.price * pd.qty} </span>

                            </div>
                            <AiFillDelete color='red' fontSize='20px' style={{ cursor: 'pointer' }} onClick={() => dispatch({ type: REMOVE_FROM_CART, payload: pd })} />

                        </span>
                    ))
                }

                <span style={{ fontWeight: 700, fontSize: 20, textAlign: 'center', color: 'white' }}> Total: $ {total} </span>
                <Button variant='success' type='button' disabled={cart.length === 0}> Procced To Checkout </Button>
            </div>
        </div>
    );
};

export default Cart;