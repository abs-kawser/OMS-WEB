import React from "react";
import "../styless/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div style={{}}>
      <h1 style={{ color: "blue", textAlign: "center" }}>Welcome to OMS</h1>
      {/* <h1 className='check'>check </h1> */}
      
      <div class="login-box">
        <h2>Login</h2>
        <form>
          <div class="user-box">
            <input type="text" name="" required="" />
            <label>Username</label>
          </div>
          <div class="user-box">
            <input type="password" name="" required="" />
            <label>Password</label>
          </div>
          <a>Login</a>
        </form>

        <p>
          Don't have an account?
          <span className="register">
            {" "}
            <Link to="/register">Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
