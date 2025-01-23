import { configureStore } from "@reduxjs/toolkit";
import { userAuthReducer } from "./userAuthSlice";
import { shoppingCartReducer } from "./shoppingCartSlice";


import {
    contactFormApi,
    authApi,
    feedApi,
    postApi,
    commentApi,
    categoryApi,
    productApi,
} from '../../APIs';


const store = configureStore({
    reducer: {
        userAuthStore: userAuthReducer,
        shoppingCartStore: shoppingCartReducer,
        [contactFormApi.reducerPath]: contactFormApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [feedApi.reducerPath]: feedApi.reducer,
        [postApi.reducerPath]: postApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware()
            .concat(contactFormApi.middleware)
            .concat(authApi.middleware)
            .concat(feedApi.middleware)
            .concat(postApi.middleware)
            .concat(commentApi.middleware)
            .concat(categoryApi.middleware)
            .concat(productApi.middleware)
});

//export type RootState = ReturnType<typeof store.getState>; >> for typescript
export default store;