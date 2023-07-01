import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {resetToDefault} from '../Reset/reset-action';

const URL_TODOS = 'http://localhost:3001/todos'

export const loadTodos = createAsyncThunk(
    '@@todos/load-all',
    async (_,{
        rejectWithValue
    }) => {
        try {
            const res = await fetch('http://localhost:3002/todos');
            const data = await res.json();
            return data;
        }
        catch (err) {
            return rejectWithValue("Failed to fetch all todos.")
        }
    },{
        condition:(_,{getState,extra})=>{
            const {loading}=getState().todos;

            if(loading==='loading'){
                return false;
            }
        }
    }
)
export const createTodo = createAsyncThunk(
    '@@todos/create-todo',
    async (id,{getState}) => {
        const todo=getState().todos.entities.find(item=>item.id===id);
        const res = await fetch(URL_TODOS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({completed: !todo.completed})
        })
        const data = await res.json()
        return data
    }
)

const todoSlice = createSlice({
    name: '@@todos',
    initialState: {
        entities: [],
        loading: 'idle', //'loading',
        error: null
    },
    reducers: {

        removeTodo: (state, action) => {
            const id = action.payload;
            return state.filter((todo) => todo.id !== id);
        },
        toggleTodo: (state, action) => {
            const id = action.payload;
            const todo = state.find((todo) => todo.id === id);
            todo.completed = !todo.completed;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetToDefault, () => {
                return []
            })
            .addCase(createTodo.pending, (state, action) => {
                state.loading = 'loading';
                state.error = null;
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = 'Something went wrong!'
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.entities.push(action.payload)
            })
            .addMatcher((action)=>action.type.endsWith('/pending'),(state)=>{
                state.loading='loading';
                state.error=null;
            })
            .addMatcher((action)=>action.type.endsWith('/rejected'),(state, action)=>{

                state.loading='idle';
                state.error=action.payload || action.error.message
            })
            .addMatcher((action)=>action.type.endsWith('/fulfilled'),(state,action)=>{
                state.loading='idle';
            })
    }
});

export const {addTodo, removeTodo, toggleTodo} = todoSlice.actions;
export const todoReducer = todoSlice.reducer;

export const selectVisibleTodos = (state, filter) => {
    switch (filter) {
        case 'all': {
            return state.todos.entities;
        }
        case 'active': {
            return state.todos.entities.filter(todo => !todo.completed);
        }
        case 'completed': {
            return state.todos.entities.filter(todo => todo.completed)
        }
        default: {
            return state.todos;
        }

    }
}