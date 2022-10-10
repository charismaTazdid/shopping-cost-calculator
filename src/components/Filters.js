import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CLEAR_FILTER, FILTER_BY_DELIVERY, FILTER_BY_RATING, FILTER_BY_STOCK, SORT_BY_PRICE } from "../context/constant";
import { cartState } from "../context/Context";
import Rating from "./Rating";


const Filters = () => {
    const { productDispatch, productState: { byStock, byFastDelivery, sort, byRating, searchQuery } } = cartState();

    // make state for rating

    // const [byRating, setRate] = useState(4)

    return (
        <div className="filters">
            <span className="title">Filter Products</span>
            <span>
                <Form.Check
                    inline
                    label="Ascending"
                    name="group1"
                    type="radio"
                    id={`inline-1`}
                    onChange={() => productDispatch({
                        type: SORT_BY_PRICE,
                        payload: "lowToHigh"
                    })}
                    checked={sort === 'lowToHigh' ? true : false}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label="Descending"
                    name="group1"
                    type="radio"
                    id={`inline-2`}
                    onChange={() => productDispatch({
                        type: SORT_BY_PRICE,
                        payload: "highToLow"
                    })}
                    checked={sort === 'highToLow' ? true : false}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label="Include Out of Stock"
                    name="group1"
                    type="checkbox"
                    id={`inline-3`}
                    onChange={() => productDispatch({ type: FILTER_BY_STOCK })}
                    checked={byStock}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label="Fast Delivery Only"
                    name="group1"
                    type="checkbox"
                    id={`inline-4`}
                    onChange={() => productDispatch({ type: FILTER_BY_DELIVERY })}
                    checked={byFastDelivery}
                />
            </span>
            <span>
                <label style={{ paddingRight: 10 }}>Rating: </label>
                <Rating
                    rating={byRating}
                    changeRating={(rating) => productDispatch({
                        type: FILTER_BY_RATING,
                        payload: rating + 1
                    })}
                    style={{ cursor: "pointer" }}
                />
            </span>
            <Button
                variant="warning"
                className="clearBtn"
                onClick={() => productDispatch({
                    type: CLEAR_FILTER
                })}
            >
                Clear Filters
            </Button>
        </div>
    );
};

export default Filters;