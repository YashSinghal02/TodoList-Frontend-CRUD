import { FaPlus } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import "./TaskManagerHead.css";
import AddTaskForm from "../Forms/AddTaskForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskManagerHead({ onTaskAdded }) {
   const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="main-head">
        <div className="main-head-text">
          <h1>Task Manager</h1>
        </div>

        <div className="main-head-button">

          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>

          <button className="add-to-task" onClick={() => setShowForm(true)}>
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
