import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css';
import Rating from './Rating';
import { useCart } from '../context/Context';

function SingleProduct({ prod }) {

  const { state: { cart }, dispatch } = useCart();
  const [newCart, setNewCart] = useState([]);

  useEffect(() => {
    const jsonData = localStorage.getItem('cart');
    if (jsonData) {
      const parsedData = JSON.parse(jsonData);
      parsedData.cart ? setNewCart(parsedData.cart) : [];
      // Use parsedData
    }
  }, [cart])

  return (
    <div className='col-lg-4 col-md-4 col-sm-5 col-5 col-xl-4 my-2'>
      <Card style={{ width: '100%' }}>
        <Card.Img variant="top" src={prod.thumbnail} className='card-img' />
        <Card.Body>
          <Card.Title>{
            prod.title.length > 15 ? (
              prod.title.substring(0, 15) + ' ...'
            )
              : (
                prod.title
              )}</Card.Title>
          <Card.Subtitle className='mb-2'>
            <span>₹ {prod.price}</span>
            {
              prod.images.length > 4 ? (
                <div>Fast Delivery</div>
              ) : (
                <div>4 days delivery</div>
              )
            }

            <Rating rating={Math.floor(prod.rating)} onClick={() => console.log("Dont do that")} />

          </Card.Subtitle>
          {
            newCart.some(p => p.id === prod.id) ? (
              <Button
                variant="danger"
                onClick={() => dispatch({
                  type: 'REMOVE_FROM_CART',
                  payload: prod
                })}
              >
                Remove from cart
              </Button>

            ) : (
              <Button
                variant="primary"
                onClick={() => dispatch({
                  type: 'ADD_TO_CART',
                  payload: prod
                })}
                disabled={prod.stock < 40}
              >
                {
                  prod.stock < 40 ? (
                    "Out of stock"
                  ) : (
                    "Add to cart"
                  )
                }
              </Button>
            )
          }
        </Card.Body>
      </Card>
    </div>
  )
}

export default SingleProduct