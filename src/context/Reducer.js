import { ADD_TO_CART, CHANGE_CART_QTY, REMOVE_FROM_CART, SORT_BY_PRICE, FILTER_BY_STOCK, FILTER_BY_DELIVERY, FILTER_BY_RATING, FILTER_BY_SEARCH , CLEAR_FILTER} from "./constant";

export const cartReducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
        case REMOVE_FROM_CART:
            return { ...state, cart: state.cart.filter((p) => p.id !== action.payload.id) };
        case CHANGE_CART_QTY:
            return { ...state, cart: state.cart.filter((p) => p.id === action.payload.id ? p.qty = action.payload.qty : p.qty) }
        default:
            return state;
    }
}

export const productReducer = (state, action) => {
    switch (action.type) {
        case SORT_BY_PRICE:
            return { ...state, sort: action.payload }
        case FILTER_BY_STOCK:
            return { ...state, byStock: !state.byStock }
        case FILTER_BY_DELIVERY:
            return { ...state, byFastDelivery: !state.byFastDelivery }
        case FILTER_BY_RATING:
            return { ...state, byRating: action.payload }
        case FILTER_BY_SEARCH:
            return { ...state, searchQuery: action.payload }
        case CLEAR_FILTER:
            return {
                byStock: false,
                byFastDelivery: false,
                byRating: 0,
                searchQuery: "",
                
            }

        default:
            return state;
    }
}