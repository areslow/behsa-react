import { createSlice } from "@reduxjs/toolkit";

export const emptyUserState = {
    id: "",
    userName: "",
    fullName: "",
    email: "",
    role: []
}

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: emptyUserState,
    reducers: {
        setLoggedInUser: (state, action)=>{
            state.id = action.payload.id;
            state.userName = action.payload.userName;
            state.fullName = action.payload.fullName;
            state.email = action.payload.email;
            state.role = action.payload.role;
        },
    },
});

export const { setLoggedInUser } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;