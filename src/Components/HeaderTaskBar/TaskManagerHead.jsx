import { FaPlus } from "react-icons/fa6";
import "./TaskManagerHead.css";
import AddTaskForm from "../Forms/AddTaskForm";
import { useState } from "react";

function TaskManagerHead({ onTaskAdded }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="main-head">
        <div className="main-head-text">
          <h1>Task Manager</h1>
        </div>

        <div className="main-head-button">
          <button onClick={() => setShowForm(true)}>
            <FaPlus /> Add Task
          </button>
        </div>
      </div>

      {/*  show only when true */}
      {showForm && (
        <AddTaskForm
          closeForm={() => setShowForm(false)}
          onTaskAdded={onTaskAdded}
        />
      )}
    </div>
  );
}

export default TaskManagerHead;
