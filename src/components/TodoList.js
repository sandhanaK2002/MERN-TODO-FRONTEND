import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

export const TodoList = ({
  text,
  updateMode,
  deleteToDo,
  isCompleted,
  handleCheckBox,
}) => {
  return (
    <div className="w-2/4 mx-auto flex items-center justify-between bg-white px-4 py-2 mb-4 rounded-lg shadow">
      <div className="text">{text}</div>
      <div className="icons flex flex-row">
        <BiEdit
          className="text-blue-500 cursor-pointer"
          onClick={updateMode}
        />
        <AiFillDelete
          className="text-red-500 cursor-pointer ml-2"
          onClick={deleteToDo}
        />
      </div>
    </div>
  );
};