import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const addItemToCart = createAsyncThunk("addItemToCart", (async (product, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/cart/addItem", { product }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(product)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

export const loadCart = createAsyncThunk("loadCart", (async (_, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.get("/cart/getItems", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return data
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

export const removeCartItem = createAsyncThunk("removeCartItem", (async (product, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/cart/removeItem", { product: product.item }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(product.index)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

const initialCartState = {
    cartItems: [], username: "",
    isCartLoading: false, cartError: "",
    cartCount: 0
}
const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        resetCart: state => {
            state = initialCartState
            return state
        }
    },
    extraReducers: {
        // Add items to cart
        [addItemToCart.pending]: (state, action) => {
            state.cartError = ""
            state.isCartLoading = true
        },
        [addItemToCart.fulfilled]: (state, action) => {
            state.isCartLoading = false
            state.cartItems.push(action.payload)
            state.cartCount++
        },
        [addItemToCart.rejected]: (state, action) => {
            state.isCartLoading = false
            state.cartError = action.payload.message
        },

        // Load cart
        [loadCart.pending]: (state, action) => {
            state.isCartLoading = true
            state.cartError = ""
        },
        [loadCart.fulfilled]: (state, action) => {
            state.isCartLoading = false
            state.cartItems = action.payload.items.map(item => item.product)
            state.cartCount = action.payload.items.length
        },
        [loadCart.rejected]: (state, action) => {
            state.isCartLoading = false
            state.cartError = action.payload.message
        },

        // Remove Cart Item
        [removeCartItem.pending]: (state, action) => {
            state.isCartLoading = true
            state.cartError = ""
        },
        [removeCartItem.fulfilled]: (state, action) => {
            state.isCartLoading = false
            state.cartItems.splice(action.payload, 1)
            state.cartCount--
        },
        [removeCartItem.rejected]: (state, action) => {
            state.isCartLoading = false
            state.cartError = action.payload.message
        },
    }
})
export const { resetCart } = cartSlice.actions
export default cartSlice.reducer