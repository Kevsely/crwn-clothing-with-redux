const CART_ACTION_TYPE = {
    ADD_TO_CART: 'ADD_TO_CART'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [], 
    cartCount: 0,
    cartTotal: 0,
}

const cartReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'SET_CART_ITEMS':
            return {
                ...state,
                ...payload,
            }
        default: 
            throw new Error(`Unhandled type of ${type} in cartReducer`)
    }
} 