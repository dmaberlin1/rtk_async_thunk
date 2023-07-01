import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ToastContainer,toast} from "react-toastify";
import {loadTodos, removeTodo, selectVisibleTodos, toggleTodo} from "./todos-slice";
import 'react-toastify/dist/ReactToastify.css'

const TodoList = () => {
    const activeFilter=useSelector(state => state.filter)
    const todos=useSelector(state => selectVisibleTodos(state,activeFilter))
    const dispatch=useDispatch();
    const {error,loading}=useSelector(state=>state.todos);

    useEffect(()=>{
        dispatch(loadTodos())
            .unwrap()
            .then(()=>{
            toast('All Todos were fetch')
        }).catch((err)=>{
            toast(err)
        })

    },[dispatch])

    return (
        <>
            <ToastContainer/>
        <ul>
            {error && <h2>{error}</h2>}
            {loading==='loading' && <h2>Loading...</h2>}
            {loading==='idle' && !error &&
                todos.map((todo)=>(
                <li key={todo.id}>
                    <input type="checkbox"
                    checked={todo.completed}
                           onChange={()=>dispatch(toggleTodo(todo.id))}
                    />{' '}
                    {todo.title}{' '}
                    <button onClick={()=>dispatch(removeTodo(todo.id))}>delete</button>
                </li>
            ))}
        </ul>
        </>
    );
};

export default TodoList;
