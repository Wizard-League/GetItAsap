import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import './Signup.css'

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    console.log("signedup");
    const user = {
      username: username,
      password: password,
      email: email,
      first_name: first_name,
      last_name: last_name,
    };

    const { data } = await axios.post(
      "http://localhost:8000/auth/signup/",
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    );

    console.log(data);
    localStorage.clear();
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data["access"]}`;
    window.location.href = "/";
  };

  return (
   
    <div className="body1">
    <form className="Auth-form" onSubmit={submit}>
      <div className="formcontent">
        <div className="container2">
        <div className="subcontainer">
        <h3 className="formtitle">Sign Up</h3>
        <div className="usrnm">
          <label>Username:</label>
          <input
            className="form-control mt-1"
            placeholder="Enter Username"
            name='username'
            type='text'
            value={username}
            required
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="enterEml">
          <label>Email:</label>
          <input
            className="form-control mt-1"
            placeholder="Enter Email"
            name='email'
            type='text'
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="enterFirst">
          <label>First Name:</label>
          <input
            className="form-control mt-1"
            placeholder="Enter First Name"
            name='first_name'
            type='text'
            value={first_name}
            required
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div className="enterLast">
          <label>last Name:</label>
          <input
            className="form-control mt-1"
            placeholder="Enter Last Name"
            name='last_name'
            type='text'
            value={last_name}
            required
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <div className="enterpass">
          <label>Password:</label>
          <input
            name='password'
            type="password"
            className="form-control mt-1"
            placeholder="Enter password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <div classname="alrdyAcc">    Already have an account?<a href='/Login' className="alrdyText"> Login</a></div>
       </div>
        </div>
      </div>
    </form>
</div>
  );
};
export default Signup;
