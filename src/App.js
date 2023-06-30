import logo from './logo.svg';
import './App.css';
import NewTodo from "./features/Todos/NewTodo";
import FilterTodo from "./features/Filters/Filter";
import TodoList from "./features/Todos/Todolist";
import ResetApp from "./features/Reset/ResetApp";

function App() {
  return (
    <div className="App">
     <h1>rtk todo</h1>
      <NewTodo/>
      <FilterTodo/>
      <TodoList/>
      <ResetApp/>
    </div>
  );
}

export default App;
