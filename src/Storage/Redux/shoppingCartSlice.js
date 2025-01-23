import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
    const savedCart = localStorage.getItem('shoppingCart');
    return savedCart ? JSON.parse(savedCart) : [];
}

const saveCart = (cart) => {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}




const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState: {
        items: loadCart()
    },
    reducers: {
        clearCart :(state)=>{ 
            state.items = [];
            localStorage.removeItem("shoppingCart");
        },
        addItemToCart: (state, action) => {
            state.items = [...state.items, action.payload];
            saveCart(state.items);
        },
        removeItemFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
            if(state.items.length > 0) saveCart(state.items);
            else {
                state.items = [];
                localStorage.removeItem("shoppingCart");
            }
        },
    },
});

export const {
    clearCart,
    addItemToCart, 
    removeItemFromCart,
} = shoppingCartSlice.actions;

export const shoppingCartReducer = shoppingCartSlice.reducer;