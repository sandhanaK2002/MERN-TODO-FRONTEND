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

  // const handleCheckBox = useCallback(async (todoId) => {
  //   try {
  //     setTodos((prevTodos) =>
  //       prevTodos.map((todo) => {
  //         if (todo._id === todoId) {
  //           return { ...todo, completed: !todo.completed };
  //         }
  //         return todo;
  //       })
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

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
      setText("")
      setIsUpdating(false)
    }
  }, [isUpdating, todoId, text]);

  return (
    <div className="App">
      <div className="container">
        <Header />
        <div className="top">
          <input
            type="text"
            placeholder="ADD TODO..."
            value={text}
            onChange={onInputChange}
          />
          <div className="add" onClick={onAddClick}>
            {isUpdating ? "UPDATE" : "ADD"}
          </div>
        </div>
        <div className="list">
          {todos.length > 0 &&
            todos.map((item) => (
              <TodoList
                key={item._id}
                text={item.text}
                isCompleted={item.completed}
                updateMode={() => updateMode(item._id, item.text)}
                deleteToDo={() => handleDeleteTodo(item._id)}
                //handleCheckBox={() => handleCheckBox(item._id)}
                
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
