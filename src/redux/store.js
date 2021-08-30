import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import errorReducer from './errorSlice';
import productsReducer from './productsSlice';
import userReducer from './userSlice';


export default configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        products: productsReducer,
        error: errorReducer
    }
})
