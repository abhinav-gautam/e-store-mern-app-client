import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Get all products
export const getProducts = createAsyncThunk("getProducts", async (_, thunkAPI) => {
    const { data } = await axios.get("/products/getProducts")
    if (data.status === "success") {
        return data
    } else {
        thunkAPI.rejectWithValue(data)
    }
})

// Add product
export const addProduct = createAsyncThunk("addProduct", async (formData, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/products/addProduct", formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log(data);
    if (data.status === "success") {
        return data
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

// Delete product
export const deleteProduct = createAsyncThunk("deleteProduct", async ({ id, index }, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.delete(`/products/deleteProduct/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log(data);
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(index)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

// Edit Product
export const editProduct = createAsyncThunk("editProduct", async ({ id, formData, index }, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.put(`/products/editProduct/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log(data);
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue({ index, product: data.product })
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

const initialProductsState = {
    productsList: [], isProductLoading: false,
    isProductUpdating: false, isProductAdding: false,
    productsError: "", productsCount: -1,
    isProductDeleting: false,
}

const productsSlice = createSlice({
    name: "products",
    initialState: initialProductsState,
    reducers: {
        resetProducts: (state) => {
            state = initialProductsState
            return state
        }
    },
    extraReducers: {
        // Get products
        [getProducts.pending]: (state, action) => {
            state.isProductLoading = true
            state.productsError = ""
        },
        [getProducts.fulfilled]: (state, action) => {
            state.isProductLoading = false
            state.productsList = action.payload.productsList
            state.productsCount = action.payload.productsList.length
        },
        [getProducts.rejected]: (state, action) => {
            state.isProductLoading = false
            state.productsError = action.payload.message
        },
        // Add Product
        [addProduct.pending]: (state, action) => {
            state.isProductAdding = true
            state.productsError = ""
        },
        [addProduct.fulfilled]: (state, action) => {
            state.isProductAdding = false
            state.productsList.push(action.payload.product)
            state.productsCount++
        },
        [addProduct.rejected]: (state, action) => {
            state.isProductAdding = false
            state.productsError = action.payload.message
        },
        // Delete Product
        [deleteProduct.pending]: (state, action) => {
            state.isProductDeleting = true
            state.productsError = ""
        },
        [deleteProduct.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isProductDeleting = false
            state.productsList.splice(action.payload, 1)
            state.productsCount--
        },
        [deleteProduct.rejected]: (state, action) => {
            state.isProductDeleting = false
            state.productsError = action.payload.message
        },
        // Update Product
        [editProduct.pending]: (state, action) => {
            state.isProductUpdating = true
            state.productsError = ""
        },
        [editProduct.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isProductUpdating = false
            state.productsList.splice(action.payload.index, 1, action.payload.product)
        },
        [editProduct.rejected]: (state, action) => {
            state.isProductUpdating = false
            state.productsError = action.payload.message
        },
    }

})

export const { resetProducts } = productsSlice.actions
export default productsSlice.reducer