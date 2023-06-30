import {configureStore} from "@reduxjs/toolkit";
import {todoReducer} from "./src/features/Todos/todos-slice";
import {filterReducer} from "./src/features/Filters/filter-slice";

export const store=configureStore({
    reducer:{
        todos:todoReducer,
        filter:filterReducer,
    },
    devTools:true
})