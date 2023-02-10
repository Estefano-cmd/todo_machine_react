import React from "react";
import { TodoCounter } from "./components/todoCounter/TodoCounter";
import { TodoSearch } from "./components/todoSearch/TodoSearch"
import { TodoList } from "./components/todoList/TodoList";
import { TodoItem } from "./components/todoItem/TodoItem";
import { CreateTodoButton } from "./components/createTodoButton/CreateTodoButton"
//import './App.css';

const defaultTodos = [
  { text: 'Cortar cebolla', completed: true },
  { text: 'Tomar curso', completed: false },
  { text: 'Llorar', completed: false },
  
]

function App() {
  const [todos, setTodos] = React.useState(defaultTodos);
  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if(!searchValue.length >= 1){
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);      
    });
  }

  const completeTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
        /* todos[todoIndex] = {
      text: todos[todoIndex].text,
      completed: true,
    };  */
    setTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  };

  return (
    <React.Fragment>
      <TodoCounter 
        total={totalTodos}
        completed={completedTodos}
      />
      <TodoSearch
        searchValue = {searchValue}
        setSearchValue = {setSearchValue}
      />

      <TodoList>
        {
          searchedTodos.map(todo => (
            <TodoItem 
            key={todo.text} 
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete ={() => deleteTodo(todo.text)}
            />
          ))
        }
      </TodoList>

      <CreateTodoButton />
    </React.Fragment>
  );
}

export default App;
