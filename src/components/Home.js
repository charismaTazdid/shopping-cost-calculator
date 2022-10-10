import React from 'react';
import { cartState } from '../context/Context';
import Filters from './Filters';
import SingleProducts from './SingleProducts';
import './styles.css';

const Home = () => {

    const { state, productState: { byStock, byFastDelivery, sort, byRating, searchQuery } } = cartState();
    const products = state.products;


    const transformProducts = () => {
        let sortProducts = products;
        if (sort) {
            sortProducts = sortProducts.sort((a, b) => (
                sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
            ))
        }
        
        if (!byStock) {
            sortProducts = sortProducts.filter((pd) => pd.inStock);
        }
        if (byFastDelivery) {
            sortProducts = sortProducts.filter((pd) => pd.fastDelivery);
        }
        if (byRating) {
            sortProducts = sortProducts.filter((pd) => pd.ratings >= byRating)
        }
        if (searchQuery) {
            sortProducts = sortProducts.filter((pd) => {
                pd.name.toLowerCase().includes(searchQuery)
            })
        }
        return sortProducts;
    }

    // console.log(products)
    return (
        <div className='home'>
            <Filters />


            <div className='productContainer'>
                {
                    transformProducts().map((pd) => (
                        <SingleProducts key={pd.id} product={pd}></SingleProducts>
                    ))
                }
            </div>
        </div>
    );
};

export default Home;