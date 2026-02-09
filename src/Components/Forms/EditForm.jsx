import axios from "axios";
import { useState, useEffect } from "react";
import "./AddTaskForm.css";
import { RxCrossCircled } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import toast from "react-hot-toast";

function EditForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  // Fetch task by ID
  useEffect(() => {
    const fetchSingletask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/todolistget/${id}`,
        );

        console.log("Server response:", response.data);

        setData({
          title: response.data.task.title,
          description: response.data.task.description,
          deadline: dayjs(response.data.deadline).format("YYYY-MM-DD"),
        });
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };

    fetchSingletask();
  }, []);

  async function SubmitForm(e) {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:4000/api/todolistedit/${id}`,
        data,
      );

      console.log(response.data);

      // go back to main page with task list
      navigate("/homepage");
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
              <h2>Edit Task</h2>
              <p>Fill in the details to stay organized</p>
            </div>

            {/*  close button */}
            <div
              className="cut-form-button"
              onClick={() => navigate("/homepage")}
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
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Enter the task"
              required
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
              placeholder="Enter the description"
              required
            />
          </div>

          {/* DEADLINE */}
          <div className="form-group">
            <label>Deadline</label>
            <input
              type="date"
              value={data.deadline}
              onChange={(e) => setData({ ...data, deadline: e.target.value })}
            required
            />
            
          </div>

          <button type="submit" id="submit-btn">
            Update
          </button>
        </form>
      </section>
    </div>
  );
}

export default EditForm;
