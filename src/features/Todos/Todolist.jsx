import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadTodos, removeTodo, selectVisibleTodos, toggleTodo} from "./todos-slice";

const TodoList = () => {
    const activeFilter=useSelector(state => state.filter)
    const todos=useSelector(state => selectVisibleTodos(state,activeFilter))
    const dispatch=useDispatch();
    const {error,loading}=useSelector(state=>state.todos);

    useEffect(()=>{
        dispatch(loadTodos())
    },[dispatch])

    return (
        <ul>
            {error && <h2>Error!</h2>}
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
    );
};

export default TodoList;
