import "./LoginForm.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function LoginForm() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  async function SubmitForm(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        data,
      );
      console.log("Server response:", response.data);

      setData({
        email: "",
        password: "",
      });

      toast.success(response?.data?.message);

      navigate("/homepage");
    } catch (err) {
      console.error("Error submitting form:", err);
      console.log(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);
    }
  }

  return (
    <div className="form-container-login">
      <form className="simple-form-login" onSubmit={SubmitForm}>
        <h2 className="login-title">Log In</h2>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Login</button>

        {/* <Link to="/allcard"> <button type="submit">Login</button></Link> */}
        <div className="text-center mt-3">
          <p className="font-normal">
            Create an account{" "}
            <Link to="/">
              <span className="text-blue-600 font-bold cursor-pointer">
                SignUp
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
