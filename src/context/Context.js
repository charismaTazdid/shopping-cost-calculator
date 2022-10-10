import React, { useContext, useReducer, createContext, useEffect } from 'react';
import { cartReducer, productReducer } from './Reducer';
import axios from "axios";

const CartContext = createContext();

const Context = ({ children }) => {

    const fetchProducts = async () => {
        const { data } = await axios.get("https://dummyjson.com/products")
        dispatch({
            type: 'LOAD_PRODUCTS',
            payload: data.products
        })
    };

    useEffect(() => {
        fetchProducts()
    }, [])


    const [state, dispatch] = useReducer(cartReducer, {
        products: [],
        cart: []
    });

    const [productState, productDispatch] = useReducer(productReducer, {
        stock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: ""
    });

    return (
        <CartContext.Provider value={{ state, dispatch, productState, productDispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export default Context;

//custom hook to get state
export const cartState = () => useContext(CartContext)


