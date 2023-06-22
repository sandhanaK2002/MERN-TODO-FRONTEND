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
        <div className="todo">
        <div className="text">{text}</div>
        <div className="icons">
            <BiEdit className='icon' onClick={updateMode} />
            <AiFillDelete className='icon' onClick={deleteToDo} />
        </div>
    </div>



//   <div className="todo">
//     <div className="row">
//       <div className={`${isCompleted ? "completed" : ""} name`}>{text}</div>
//     </div>
//     <div className="icons">
//       <BiEdit className="icon edit" onClick={updateMode} />
//       <AiFillDelete className="icon delete" onClick={deleteToDo} />
//     </div>
//   </div>
      );
};
