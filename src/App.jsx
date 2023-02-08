import React, { useState } from "react";
import { AiOutlinePlus } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { BiEdit } from 'react-icons/bi';
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");
  const [searchInput, setSearchInput] = useState("");


  console.log(searchInput);
  //form submit
  function handleSubmit(e) {
    e.preventDefault();
    const time = new Date().toLocaleTimeString();
    const newTodo = {
      id: time,
      text: todo,
    };

    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  //Delete todo functionality
  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  //Editing submit funtionality
  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div className="App min-h-screen">
      <h1 className="text-6xl font-bold text-white">TODO LIST</h1>
      <form className="container " onSubmit={handleSubmit}>
        <div className="mt-10 flex justify-center items-center w-full">
          <input
            type="text"
            className="w-1/2 h-14 p-4 text-2xl rounded-full"
            placeholder=" Todos..."
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            required
          />
          <button className="  bg-[#5645f7] h-14 w-14 px-2 text-2xl ml-4  rounded-full text-white font-bold hover:bg-[#796de2] hover:scale-95 hover:ease-in-out hover:duration-300" type="submit">
            <AiOutlinePlus className="ml-2"/>
          </button>
        </div>
      </form>
      <div>
      <h3 className="text-white mt-4">Filter Todos</h3>
      <input type="search" className="mt-2 w-2/6 p-4"  placeholder='Search...'
                 onChange={(e) => setSearchInput(e.target.value)}/>
      </div>
     
      
      
      {todos.filter((todo)=> todo.text.toLowerCase().includes(searchInput.toLowerCase())).map((todo) => (
        <div key={todo.id} className="mx-auto flex justify-between items-center w-9/12 mt-4 px-4 py-2 bg-[#c4b2b2]  text-white rounded-xl">
          
          {todoEditing === todo.id ? (
            <input
              type="text"
              className="w-2/6 h-14 p-2 text-4xl text-gray-500 rounded-sm"
              onChange={(e) => setEditingText(e.target.value)}
              value={editingText}
            />
          ) : (
            <div className="w-6/12  flex justify-between items-center">
              <p className="text-base w-12/12 items-start">{todo.id}</p>
              <h2  className="text-2xl w-8/12">{todo.text}</h2>
            </div>
            
          )}

          <div className="flex justify-center items-center">
            <button
              className="text-red-500  text-3xl px-4 font-bold rounded-lg hover:scale-95 hover:ease-in-out hover:duration-300"
              onClick={() => deleteTodo(todo.id)}
            >
              <BsTrash/>
            </button>

            {todoEditing === todo.id  ? ( <button
              className="text-green-500 text-2xl px-4  ml-4 font-bold rounded-lg hover:scale-95 hover:ease-in-out hover:duration-300"
              onClick={() => submitEdits(todo.id)}
            >
              Submit Edit
            </button>)  : (<button
              className="text-green-500  text-3xl px-4 ml-4 font-bold rounded-lg hover:scale-95 hover:ease-in-out hover:duration-300"
              onClick={() => setTodoEditing(todo.id)}
            >
              <BiEdit/>
            </button>
            ) }
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
