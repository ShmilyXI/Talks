import { combineReducers } from "redux";

import common from "@/redux/slices/common";

import { store } from "./store";

const rootReducer = combineReducers({ common });

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
