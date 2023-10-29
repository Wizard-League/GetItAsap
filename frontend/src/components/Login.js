import axios from "axios";
// import { Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Navbar";
import "./Login.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    const { data } = await axios.post(
      "http://localhost:8000/auth/login/",
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
    window.location.href = '/'
        // (async () => {
        //   try {
        //     const { data } = await axios.get("http://localhost:8000/api/user", {
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //     });
        //     console.log(data)
        //     if(data.is_merch){
        //      <Navigate to='/shopdashboard'/>
        //     }
        //   } catch (e) {
        //     console.log("not auth");
       
        //   }
        // })();
  };

  return (
    <>
      <div className="body3">
        <div
          className="container2"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div className="superContainer">
            <form className="Auth-form" onSubmit={submit}>
              <div className="containe text-center">
                <h3>SIGN IN</h3>

                <div className="username">
                  <label>Username: </label>
                  <input
                    className="form-control mt-1"
                    placeholder="Enter Username"
                    name="username"
                    type="text"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="password">
                  <label>Password: </label>
                  <input
                    name="password"
                    type="password"
                    className="form-control mt-1"
                    placeholder="Enter password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="container1">
                  <div className="gotPass">
                    <button type="button" className="gotPass">
                      <p className="passText">Forgot password!</p>
                    </button>
                  </div>
                  <button type="submit" className="primaryBtn">
                    Submit
                  </button>
                </div>
                <div className="crtAcc">
                  Don't have an account?
                  <a href="/Signup" className="crtAccLink">
                    Sign up!
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
