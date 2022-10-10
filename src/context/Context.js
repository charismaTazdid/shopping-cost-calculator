import React, { useContext, useReducer, createContext } from 'react';
import { faker } from '@faker-js/faker';
import { cartReducer, productReducer } from './Reducer';
// import faker from "faker"

const CartContext = createContext();
faker.seed(99)
const Context = ({ children }) => {

    const products = [...Array(20)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.image(),
        inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
        fastDelivery: faker.datatype.boolean(),
        ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
    }));

    const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: []
    });

    const [productState, productDispatch] = useReducer(productReducer, {
        byStock: false,
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


