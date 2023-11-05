import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import { useCart } from '../context/Context';

function Filter() {

  const { productState: { byStock, byFastDelivery, sort, byRating }, productDispatch } = useCart();
  const [rate, setRate] = useState(3);

  return (
    <>
      <div className="col-lg-3 col-xl-3 col-md-3 col-sm-4 col-12 filters bg-dark text-white d-flex flex-column flex-wrap my-2 ms-md-2 ms-sm-2 ms-lg-2 ms-xl-2 p-4">
        <h3 className="title my-3">Filter Products</h3>
        <span className='mb-3'>
          <Form.Check
            inline
            label='Ascending'
            name='group1'
            id='inline-1'
            type='radio'
            onChange={() => productDispatch({
              type: 'SORT_BY_PRICE',
              payload: 'lowToHigh'
            })
            }
            checked={sort === 'lowToHigh' ? true : false}
          />
        </span>
        <span className='mb-3'>
          <Form.Check
            inline
            label='Descending'
            name='group1'
            id='inline-2'
            type='radio'
            onChange={() => productDispatch({
              type: 'SORT_BY_PRICE',
              payload: 'highToLow'
            })
            }
            checked={sort === 'highToLow' ? true : false}
          />
        </span>
        <span className='mb-3'>
          <Form.Check
            inline
            label='Out of stock'
            name='group1'
            id='inline-3'
            type='checkbox'
            onChange={() => productDispatch({
              type: 'FILTER_BY_STOCK'
            })
            }
            checked={byStock}
          />
        </span>
        <span className='mb-3'>
          <Form.Check
            inline
            label='Fast Delivery'
            name='group1'
            id='inline-4'
            type='checkbox'
            onChange={() => productDispatch({
              type: 'FILTER_BY_DELIVERY'
            })
            }
            checked={byFastDelivery}
          />
        </span>
        <span className='mb-3'>
          <label className='pe-2'>Rating: </label>
          <Rating
            rating={byRating}
            style={{ cursor: 'pointer' }}
            forRating={(i) => productDispatch({
              type: 'FILTER_BY_RATING',
              payload: i + 1
            })}
          />
        </span>
        <Button
          variant='light'
          onClick={() => productDispatch({
            type: 'CLEAR_FILTERS'
          })}
        >
          Clear Filters
        </Button>
      </div>
    </>
  )
}

export default Filter