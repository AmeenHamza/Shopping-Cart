import React, { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { useCart } from '../context/Context';
import Rating from './Rating';
import Button from 'react-bootstrap/Button';
import { AiFillDelete } from 'react-icons/ai';
import Form from 'react-bootstrap/Form';

function Cart() {

  const { state: { cart }, dispatch } = useCart();
  const [total, setTotal] = useState(0);
  const [newCart, setNewCart] = useState([]);

  const getData = () => {
    const jsonData = localStorage.getItem('cart');
    if (jsonData) {
      const parsedData = JSON.parse(jsonData);
      parsedData.cart ? setNewCart(parsedData.cart) : [];
    }
  }

  useEffect(() => {
    getData();
  }, [cart])

  useEffect(() => {
    setTotal(newCart.reduce((acc, curr) => acc + Number(curr.price * curr.qty), 0))
  }, [newCart])

  return (
    <>
      <div className="row mt-3 justify-content-evenly">
        <div className="col-lg-9 col-md-9 col-md-9 col-xl-9 col-sm-9 col-9">
          <ListGroup>
            {
              newCart.map((prod) => (
                <ListGroup.Item key={prod.id}>
                  <div className="row d-flex align-items-center">
                    <div className="col-lg-2 col-md-2 col-xl-2 col-sm-2 col-11"><img src={prod.thumbnail} className='img-fluid rounded' /></div>
                    <div className="col-lg-2 col-md-2 col-xl-2 col-sm-2 col-11 fw-semibold">{prod.title}</div>
                    <div className="col-lg-2 col-md-2 col-xl-2 col-sm-2 col-11">₹ {prod.price}</div>
                    <div className="col-lg-2 col-md-2 col-xl-2 col-sm-2 col-11">
                      <Rating rating={Math.floor(prod.rating)} />
                    </div>
                    <div className="col-lg-2 col-md-2 col-xl-2 col-sm-2 col-11">
                      <Form.Control
                        as='select'
                        value={prod.qty}
                        onChange={(e) => dispatch({
                          type: 'CHANGE_PROD_QTY',
                          payload: {
                            id: prod.id,
                            qty: e.target.value
                          }
                        })
                      }
                      onClick={getData}
                      >
                        {
                          [...Array(5).keys()].map((val) => (
                            <option key={val}>{val + 1}</option>
                          ))
                        }
                      </Form.Control>
                    </div>
                    <div className="col-lg-2 col-md-2 col-xl-2 col-sm-2 col-11">
                      <Button
                        variant='light'
                        type='button'
                        style={{ cursor: 'pointer' }}
                        onClick={() => dispatch({
                          type: 'REMOVE_FROM_CART',
                          payload: prod
                        })}
                      >
                        <AiFillDelete fontSize='20px' />
                      </Button>
                    </div>
                  </div>
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        </div>

        {/* Summary Section */}

        <div className="col-lg-3 col-xl-3 col-md-3 col-sm-3 col-12 cart-filter text-white bg-dark p-5 d-flex flex-column align-items-center justify-content-aroung">
          <h3>Subtotal {newCart.length} items</h3>
          <h4 className='fw-bold'>Total ₹ {total}</h4>
          <Button
            type='button'
            className='mt-3 w-100 fw-bold fs-md-5 fs-lg-5 fs-xl-5 fs-sm-5'
            disabled={newCart.length === 0}
          >Proceed to Checkout</Button>
        </div>
      </div>
    </>
  )
}

export default Cart