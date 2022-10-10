import React from 'react';
import { cartState } from '../context/Context';
import Filters from './Filters';
import SingleProducts from './SingleProducts';
import './styles.css';

const Home = () => {

    const { state, productState: { stock, sort, byRating, searchQuery } } = cartState();
    const products = state.products;

    const transformProducts = () => {
        let sortProducts = products;
        if (sort) {
            sortProducts = sortProducts.sort((a, b) => (
                sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
            ))
        }

        if (!stock) {
            sortProducts = sortProducts.filter((pd) => pd.stock);
        }

        if (byRating) {
            sortProducts = sortProducts.filter((pd) => (Math.round(pd.rating)) >= byRating)
        }
        if (searchQuery) {
            sortProducts = sortProducts.filter((pd) => {
                return pd.title.toLowerCase().includes(searchQuery) || pd.brand.toLowerCase().includes(searchQuery)
            })

        }
        return sortProducts;
    }

  
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