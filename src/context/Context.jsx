import React, { createContext, useContext, useState, useEffect, useReducer } from 'react'
import { cartReducer, productReducer } from './Reducers';

export const cartContext = createContext();

function Context({ children }) {

    const [Products, setProducts] = useState([]);

    const [state, dispatch] = useReducer(cartReducer, {
        cart: [],
        products: []
    })

    // Product Reducer
    // One parameter is name of reducer and the second is initial state like redux-toolkit

    const [productState, productDispatch] = useReducer(productReducer, {
        byStock: false,
        sort: "",
        byRating: 0,
        byFastDelivery: false,
        searchQuery: ""
    })

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then((res) => res.json())
            .then((data) => dispatch({ type: 'SET_PRODUCTS', payload: data.products }))
    }, [])

    return (
        <cartContext.Provider value={{ state, dispatch, productState, productDispatch }}>
            {children}
        </cartContext.Provider>
    )
}

export default Context

export const useCart = () => {
    return useContext(cartContext)
}