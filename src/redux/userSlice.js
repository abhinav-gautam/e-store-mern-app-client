import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios"

export const userLogin = createAsyncThunk("loginUser", async (userCreds, thunkAPI) => {
    let response;
    if (userCreds.role === "user") {
        response = await axios.post("/users/login", userCreds)
    } else {
        response = await axios.post("/admin/login", userCreds)
    }
    const { data } = response
    if (data.status === "success") {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify({ ...(data.user), role: userCreds.role }))
        return { ...(data.user), role: userCreds.role }
    } else if (data.status === "failed") {
        return thunkAPI.rejectWithValue(data)
    }
})

export const resetUser = createAsyncThunk("resetUser", () => {
    return new Promise((resolve, reject) => {
        localStorage.removeItem("token")
        resolve("done")
    })
})

const initialUserState = {
    user: {}, isAuth: false,
    isUserLoading: false,
    userErrors: ""
}

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        setUser: (state, action) => {
            console.log(action);
            state.user = action.payload
            state.isAuth = true
            return state
        }
    },
    extraReducers: {
        // User login
        [userLogin.pending]: (state, action) => {
            state.isUserLoading = true
        },
        [userLogin.fulfilled]: (state, action) => {
            state.user = action.payload
            state.isAuth = true
            state.isUserLoading = false
            state.userErrors = ""
        },
        [userLogin.rejected]: (state, action) => {
            state.isUserLoading = false
            state.userErrors = action.payload.message
        },
        // Reset user
        [resetUser.fulfilled]: (state) => {
            state = initialUserState
            return state
        }
    }
})
export const { setUser } = userSlice.actions
export default userSlice.reducer