import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../context/constant';
import { cartState } from '../context/Context';
import Rating from './Rating'

const SingleProducts = ({ product }) => {
console.log(product)
    const { state: { cart }, dispatch } = cartState();

    const addToCart = (pd) => {
        return dispatch({ type: ADD_TO_CART, payload: pd })
    }

    const removeFromCart = (pd) => {
        return dispatch({ type: REMOVE_FROM_CART, payload: pd })
    }

    return (
        <div className='products'>
            <Card>
                <Card.Img src={product.images[0]} variant="top" alt={product.title} className="productImage" />
                <Card.Body className='productDetail'>
                    <Card.Title>{product.title} || Brand : {product.brand}</Card.Title>
                 
                    <p style={{ paddingBottom: 10 }}> {product.description} </p>
                    <Card.Subtitle style={{ paddingBottom: 10 }}>
                        <span style={{ paddingBottom: '12px' }}> Price:  <b>$</b> {product.price} only </span>
                        {
                            product.fastDelivery ? (<div> Fast Delivery </div>) : (<div style={{margin: '10px 0'}}> 4 Days Delivery</div>)
                        }
                        <Rating rating={Math.round(product.rating)}
                            changeRating={() => { }}
                            style={{ color: "orange" }}
                        />

                    </Card.Subtitle>

                    {
                        cart.some((p) => p.id === product.id) ? (<Button onClick={() => removeFromCart(product)} variant='danger'> Remove From Cart </Button>)
                            :
                            (<Button disabled={!product.stock}
                                variant='success'
                                onClick={() => addToCart(product)}
                            >
                                {!product.stock ? " Out Of Stock " : "Add To Cart"}
                            </Button>)
                    }






                </Card.Body>
            </Card>
        </div>
    );
};

export default SingleProducts;



