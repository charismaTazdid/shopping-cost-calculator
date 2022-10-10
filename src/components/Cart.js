import { type } from '@testing-library/user-event/dist/type';
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
                                        <Image src={item.image} alt={item.name} fluid rounded />

                                    </Col>
                                    <Col md={2}>
                                        <span>{item.name}</span>
                                    </Col>
                                    <Col md={2}>
                                        <span> $ {item.price}</span>
                                    </Col>
                                    <Col md={2}>
                                        <Rating rating={item.ratings} />
                                    </Col>
                                    <Col md={2}>
                                        <Form.Control as={'select'} value={item.qty}
                                            onChange={(e) => dispatch({
                                                type: CHANGE_CART_QTY,
                                                payload: { id: item.id, qty: e.target.value }
                                            })}
                                        >

                                            {
                                                [...Array(item.inStock).keys()].map((x) => (
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
            <div className='filters summary'>
                <span className='title'> Subtotal: {cart.length}</span>
                <span style={{ fontWeight: 700, fontSize: 20 }}> Total: $ {total} </span>
                <Button type='button' disabled={cart.length === 0}> Procced To Checkout </Button>
            </div>
        </div>
    );
};

export default Cart;