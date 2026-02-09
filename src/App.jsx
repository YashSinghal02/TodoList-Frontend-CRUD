import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TaskManagerHead from "./Components/HeaderTaskBar/TaskManagerHead";
import Taskcreated from "./Components/TaskCreated/Taskcreated";
import EditForm from "./Components/Forms/EditForm";
import SignupForm from "./Components/Forms/SignupForm";
import LoginForm from "./Components/Forms/LoginForm";
import { Toaster } from "react-hot-toast";
import toast from 'react-hot-toast';

function HomePage() {
  const [cards, setCards] = useState([]);

  async function fetchTasks() {
    try {
      const response = await axios.get("http://localhost:4000/api/todolistget");
      setCards(response.data.todolist);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleDeleteTask(id) {
    try {
      const response=await axios.delete(`http://localhost:4000/api/todolistdelete/${id}`);
         toast.success(response?.data?.message);
      fetchTasks();
   
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err?.response?.data?.message);
    }
  }

  function handleTaskAdded() {
    fetchTasks();
  }

  return (
    <>
      <TaskManagerHead onTaskAdded={handleTaskAdded} />
      <Taskcreated cards={cards} onDeleteTask={handleDeleteTask} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/edittask/:id" element={<EditForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
