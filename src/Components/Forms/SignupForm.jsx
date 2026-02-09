import { useState } from "react";
import axios from "axios";
import "./SignupForm.css"
import { Link } from "react-router";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

function SignupForm() {
      const navigate = useNavigate();
     
    //     const goHome = () => navigate("/");

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  async function SubmitForm(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/user/signup", data);
      console.log("Server response:", response.data);

      // Reset fields
      setData({
        name: "",
        email: "",
        phone: "",
        password: "",
      });

    toast.success(response?.data?.message);
       navigate("/login");  

    } catch (err) {
      console.log("Error submitting form:", err);
       toast.error(err?.response?.data?.message)
      
    }
  }

  return (
    <div className="form-container-signup">
      <form className="simple-form-signup" onSubmit={SubmitForm}>
      <h2 className="form-title">SignUp</h2>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          placeholder="Enter your name"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          id="number"
          type="tel"
          name="number"
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
          placeholder="Enter your phone number"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder="Enter your password"
          required
        />
<button type="submit">Submit</button>
        {/* <Link to="/login"><button type="submit">Submit</button></Link> */}
        <div className="text-center mt-3">
<p className="font-normal">Login in an account <Link to="/login"><span className="text-blue-600 font-bold cursor-pointer">Login</span></Link></p>
    </div>
      </form>
    </div>
  );
}

export default SignupForm
