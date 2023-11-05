export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload }

        case 'ADD_TO_CART':
            const upadatedCart = { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
            localStorage.setItem('cart', JSON.stringify(upadatedCart));
            return upadatedCart;

        case 'REMOVE_FROM_CART':
            const dat = JSON.parse(localStorage.getItem('cart'));
            const removeCart = { ...state, cart: dat.cart.filter((prod) => prod.id !== action.payload.id) };
            localStorage.setItem('cart', JSON.stringify(removeCart));
            return removeCart;

        case 'CHANGE_PROD_QTY':

            if (!state.cart) {
                return state;
            }

            const data = JSON.parse(localStorage.getItem('cart'));
            const quantityCart = {...state, cart: data.cart.map((item) => {
                    if (item.id === action.payload.id) {
                        return { ...item, qty: action.payload.qty };
                    }
                    return item;
                })
            };
            localStorage.setItem('cart', JSON.stringify(quantityCart));

        default:
            return state;
    }
}

export const productReducer = (state, action) => {
    switch (action.type) {
        case 'SORT_BY_PRICE':
            return { ...state, sort: action.payload }

        case 'FILTER_BY_STOCK':
            return { ...state, byStock: !state.byStock }

        case 'FILTER_BY_DELIVERY':
            return { ...state, byFastDelivery: !state.byFastDelivery }

        case 'FILTER_BY_SEARCH':
            return { ...state, searchQuery: action.payload }

        case 'FILTER_BY_RATING':
            return { ...state, byRating: action.payload }

        case 'CLEAR_FILTERS':
            return {
                byStock: false,
                byRating: 0,
                byFastDelivery: false,
                searchQuery: "",
                sort: ""
            }

        default:
            return state;
    }
}