import axios from 'axios';

const baseurl = process.env.baseurl ||  "http://localhost:8000/api/todos"

export const fetchTodos = async () => {
  try {
    const response = await axios.get(baseurl);
    return response.data
    // setTodo(response.data)
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const createTodo = async (text) => {
  try {
    const response = await axios.post(baseurl, {text});
    
    if(response.status === 201) {
      return response.data;
    } else return false;

    // setText("")
    // fetchTodos(setTodo)
    } catch (error) {
    console.error('Error creating todo:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

  export const updateTodo = async (todoId , text ) => {
    try {
      console.log(text)
      const response = await axios.put(`${baseurl}/${todoId}`, {text});
      if (response.status === 200){
        return response.data
      }  else return false

      // setText("")
      // setIsUpdating(false)
      // fetchTodos()
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error; // Rethrow the error to handle it in the component
    }
  };

export const deleteTodo = async (_id) => {
  try {
    const response = await axios.delete(`${baseurl}/${_id}`);
    if (response.status === 200){
      return response.data
    }  else return false

    // fetchTodos();
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

