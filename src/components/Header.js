import React from 'react';
import { Badge, Container, Dropdown, FormControl, Nav, Navbar } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FILTER_BY_SEARCH } from '../context/constant';
import { cartState } from '../context/Context';
import logo from '../logo.png';

const Header = () => {

    const { state: { cart }, productDispatch } = cartState();

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
                    <Link to={'/cart'}>
                        <Dropdown alignhright={"true"}>
                            <Dropdown.Toggle variant='success'>
                                <FaShoppingCart color="white" fontSize="25px" />
                                <Badge bg='none'> {cart.length} </Badge>
                            </Dropdown.Toggle>
                        </Dropdown>
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;