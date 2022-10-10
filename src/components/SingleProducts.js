import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../context/constant';
import { cartState } from '../context/Context';
import Rating from './Rating'

const SingleProducts = ({ product }) => {

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
                <Card.Img src={product.image} variant="top" alt={product.name} />
                <Card.Body>
                    <Card.Title>{product.name} </Card.Title>
                    <Card.Subtitle style={{ paddingBottom: 10 }}>
                        <span> $ {product.price.split(".")[0]} only </span>
                        {
                            product.fastDelivery ? (<div> Fast Delivery </div>) : (<div> 4 Days Delivery</div>)
                        }
                        <Rating rating={product.ratings} changeRating={() => { }} />
                    </Card.Subtitle>

                    {
                        cart.some((p) => p.id === product.id) ? (<Button onClick={() => removeFromCart(product)} variant='danger'> Remove From Cart </Button>)
                            :
                            (<Button disabled={!product.inStock}
                                variant='success'
                                onClick={() => addToCart(product)}
                            >
                                {!product.inStock ? " Out Of Stock " : "Add To Cart"}
                            </Button>)
                    }






                </Card.Body>
            </Card>
        </div>
    );
};

export default SingleProducts;



    // fetch('https://fakestoreapi.com/products')
    // .then(res => res.json())
    // .then(data => console.log(data))
