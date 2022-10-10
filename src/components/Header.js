import React from 'react';
import { Badge, Button, Container, Dropdown, FormControl, Nav, Navbar } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FILTER_BY_SEARCH, REMOVE_FROM_CART } from '../context/constant';
import { cartState } from '../context/Context';
import logo from '../logo.png';

const Header = () => {

    const { state: { cart }, dispatch, productDispatch } = cartState();

    return (
        <Navbar className='navbar' bg='dark' variant='dark' style={{ height: 80 }}>
            <Container >
                <Navbar.Brand>
                    <Link to="/">
                        <img src={logo} className="logo" alt="Shoping Cart" />
                    </Link>
                </Navbar.Brand>
                <Navbar.Text className='search'>
                    <FormControl
                        style={{ width: 500 }}
                        placeholder="Search For Product"
                        className='m-auto'
                        onChange={(e) => productDispatch({
                            type: FILTER_BY_SEARCH,
                            payload: e.target.value
                        })}
                    />
                </Navbar.Text>
                <Nav>
                    <Dropdown alignhright={"true"}>
                        <Dropdown.Toggle variant='success'>
                            <FaShoppingCart color="white" fontSize="25px" />
                            <Badge bg='none'> {cart.length} </Badge>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='cartMenu'  >
                            {
                                cart.length ? (<>
                                    {
                                        cart.map((pd) => (
                                            <span className='cartItem' key={pd.id}>
                                                <img className='cartItemImg' src={pd.image} alt={pd.name} />

                                                <div className='cartItemDetail'>
                                                    <span>{pd.name}</span>
                                                    <span> $ {pd.price.split('.')[0]} </span>

                                                </div>
                                                <AiFillDelete color='red' fontSize='20px' style={{ cursor: 'pointer' }} onClick={() => dispatch({ type: REMOVE_FROM_CART, payload: pd })} />

                                            </span>
                                        ))
                                    }

                                    <Link to={"/cart"} >
                                        <Button type='button' variant='success' style={{ width: '95%', margin: '0 10px', }}> Procced To CheckOut </Button>
                                    </Link>


                                </>)

                                    :

                                    (<span style={{ padding: 10 }}>Cart is Empty Now</span>)
                            }

                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;