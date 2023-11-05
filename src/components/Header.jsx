import React, { useEffect, useState } from 'react'
import { Navbar, Container, FormControl, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../App.css';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import { useCart } from '../context/Context';

function Header() {

  const { state: { cart }, productState, productDispatch, dispatch } = useCart();
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
    <Navbar sticky="top" variant='dark' className="bg-dark" style={{ height: 70 }}>
      <Container>
        <Navbar.Brand>
          <Link to='/'>Shopping Cart</Link>
        </Navbar.Brand>
        <Navbar.Text className='search'>
          <FormControl
            style={{ width: 500 }}
            placeholder='Search a product'
            className='m-auto d-lg-block d-md-block d-none'
            onChange={(e) => productDispatch({
              type : 'FILTER_BY_SEARCH',
              payload : e.target.value
            })}
          />
        </Navbar.Text>
        <Nav>
          <Dropdown align='end'>
            <Dropdown.Toggle variant='success' id="dropdown-custom-components">
              <FaShoppingCart color='white' fontSize='25px' />
              <Badge bg='transparent'>{newCart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu className='dropdown-menu'>
              {
                newCart.length > 0 ? (
                  <>
                    {
                      newCart?.map((prod) => (
                        <span className='cartitem' key={prod.id}>
                          <img
                            src={prod.thumbnail}
                            className='cartItemImg'
                          />
                          <div className="cartItemDetail">
                            <span>{prod.title}</span>
                            <span>₹ {prod.price}</span>
                          </div>
                          <AiFillDelete
                            fontSize='20px'
                            style={{ cursor: 'pointer' }}
                            onClick={() => dispatch({
                              type: 'REMOVE_FROM_CART',
                              payload: prod
                            })}
                          />
                        </span>
                      ))
                    }
                    <Link to='/cart'>
                      <Button
                        className='mx-2'
                        style={{ width: '95%' }}
                      >
                        Go To Cart
                      </Button>
                    </Link>
                  </>
                ) : (
                  <span className='p-4'>Cart is empty!</span>
                )
              }
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header