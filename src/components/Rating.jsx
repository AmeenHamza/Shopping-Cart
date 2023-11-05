import React, { useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

function Rating({ rating, forRating, style }) {

    const [arr] = useState([1, 2, 3, 4, 5]);

    return (
        <>
            {
                arr.map((_, i) => (
                    <span key={i} onClick={() => forRating(i)} style={style}>
                        {
                            rating > i ? (
                                <AiFillStar />
                            ) : (
                                <AiOutlineStar />
                            )
                        }
                    </span>
                ))
            }
        </>
    )
}

export default Rating