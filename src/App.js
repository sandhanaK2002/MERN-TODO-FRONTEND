import React, { useEffect, useState, useCallback } from "react";
import { Header } from "./components/Header";
import { TodoList } from "./components/TodoList";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./utils/handleTodoApi";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoId, setTodoId] = useState("");

  useEffect(() => {
    getTodoList();
  }, []);

  const getTodoList = async () => {
    try {
      const data = await fetchTodos();
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      const data = await deleteTodo(todoId);
      if (data) {
        getTodoList();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateMode = useCallback((_id, text) => {
    setIsUpdating(true);
    setText(text);
    setTodoId(_id);
  }, []);

  const onInputChange = (e) => {
    setText(e.target.value);
  };

  const onAddClick = useCallback(async () => {
    let data = null;
    if (isUpdating) {
      data = await updateTodo(todoId, text);
    } else {
      data = await createTodo(text);
    }

    if (data) {
      getTodoList();
      setText("");
      setIsUpdating(false);
    }
  }, [isUpdating, todoId, text]);

  return (
    <div className="App min-h-screen  py-8 w-full">
      <div className="container mx-auto">
        <Header />
        <div className="top flex items-center justify-center">
          <input
            type="text"
            placeholder="ADD TODO..."
            value={text}
            onChange={onInputChange}
            className="px-4 py-2 border w-2/5 border-gray-300 rounded-lg focus:outline-none"
          />
          <button
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={onAddClick}
          >
            {isUpdating ? "UPDATE" : "ADD"}
          </button>
        </div>
        <div className="list mt-8">
          {todos.length > 0 &&
            todos.map((item) => (
              <TodoList
                key={item._id}
                text={item.text}
                isCompleted={item.completed}
                updateMode={() => updateMode(item._id, item.text)}
                deleteToDo={() => handleDeleteTodo(item._id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;