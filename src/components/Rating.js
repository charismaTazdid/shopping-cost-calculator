import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Rating = ({ rating, changeRating, style }) => {
    return (
        <>
            {
                [...Array(5)].map((_, index) => {
                    return <span key={index} onClick={() => changeRating(index)} style={style}>
                        {
                            rating > index ? (<AiFillStar fontSize="20px" />)
                                :
                                (<AiOutlineStar fontSize="20px" />)}
                    </span>
                })
            }
        </>
    );
};

export default Rating;