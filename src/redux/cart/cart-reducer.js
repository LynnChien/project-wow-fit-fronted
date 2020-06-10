import { cartActionTypes } from "./cart-action-type";
import { addShopItemToCart } from "./cart-utils";

const INITIAL_STATE = {
    hidden: true,
    cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case cartActionTypes.TAGGLE_CART_DROPDOWN:
            return { ...state, hidden: !state.hidden };
        case cartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addShopItemToCart(state.cartItems, action.payload),
            };
        default:
            return state;
    }
};

export default cartReducer;