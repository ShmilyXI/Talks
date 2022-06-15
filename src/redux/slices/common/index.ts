import { createSlice } from "@reduxjs/toolkit";

interface ICommon {
    token?: string;
}

const initialState: ICommon = {};

const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        clearToken: (state) => {
            state.token = undefined;
        },
    },
});

export const { setToken, clearToken } = commonSlice.actions;

export default commonSlice.reducer;
