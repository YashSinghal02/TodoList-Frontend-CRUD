import axios from "axios";
import { useState } from "react";
import "./AddTaskForm.css";
import { RxCrossCircled } from "react-icons/rx";
import toast from 'react-hot-toast';

function AddTaskForm({ closeForm, onTaskAdded }) {
  const [data, setData] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  async function SubmitForm(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/todolistpost",
        data
      );

      console.log(response.data);

      // reset form
      setData({
        title: "",
        description: "",
        deadline: "",
      });

      //  auto close after submit
      closeForm();

      // inform parent to refresh the task list
      if (onTaskAdded) {
        onTaskAdded();
      }
      toast.success(response?.data?.message);

    } catch (error) {
      console.log("Error Submitting form:", error);
      toast.error(error?.response?.data?.message);

    }
  }

  return (
    <div className="main-outer-submitform">

      <section className="main-inner-submitform">

        <form onSubmit={SubmitForm}>

          {/* HEADER */}
          <div className="Submitform-head">

            <div className="form_heading">
              <h2>Add New Task</h2>
              <p>Fill in the details to stay organized</p>
            </div>

            {/*  close button */}
            <div
              className="cut-form-button"
              onClick={closeForm}
              style={{ cursor: "pointer" }}
            >
              <RxCrossCircled size={26} />
            </div>

          </div>


          {/* TITLE */}
          <div className="form-group">
            <label>Task Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) =>
                setData({ ...data, title: e.target.value })
              }
              required
              placeholder="Enter the task"
            />
          </div>


          {/* DESCRIPTION */}
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              required
              placeholder="Enter the description"
            />
          </div>


          {/* DEADLINE */}
          <div className="form-group">
            <label>Deadline</label>
            <input
              type="date"
              value={data.deadline}
              onChange={(e) =>
                setData({ ...data, deadline: e.target.value })
              }
              required
            />
          </div>


          <button type="submit" id="submit-btn">
            Submit
          </button>

        </form>

      </section>
    </div>
  );
}

export default AddTaskForm;
