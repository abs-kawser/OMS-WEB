import React, { useState } from "react";
import "../styless/Login.css";
import { Link } from "react-router-dom";
// import { useLogin } from "./../Context/LoginProvider";
// import { useHistory } from "react-router-dom";
import { BASE_URL, PASSWORD, USERNAME } from "./../../varible";
import base64 from "base-64";
import axios from "axios";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // console.log("userId", userId);
  // console.log("password", password);

  //error handleing
  const [error, setError] = useState(null);
  //useContext api
  // const { isLoggedIn, setIsLoggedIn } = useLogin();
  // const history = useHistory();
  //loading
  const [isLoading, setIsLoading] = useState(false);

  // const handleLogin = async () => {
  //   try {

  //     const authHeader = "Basic" + base64.encode(USERNAME + ":" + PASSWORD);
  //     const response = await fetch(`${BASE_URL}/api/HomeApi/Login?networkId=${userId}&password=${password}`,{
  //         method: "POST",
  //         mode: 'no-cors',
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Origin": "*",
  //           Authorization: authHeader,
  //         },

  //       },

  //     );

  //     const result = await response.json();
  //     console.log("rst", result);
  //   } catch (error) {
  //     console.error("Login Error:", error);
  //   } 
  // };

const handleLogin = async () => {
// e.preventDefault()
try {
  const credentials = `${USERNAME}:${PASSWORD}`;
  const base64Credentials = btoa(credentials);
  // const authHeader ="Basic"+base64.encode(USERNAME + ":" + PASSWORD);
  const apiUrl = 'api/HomeApi/Login';
  const queryParams = `networkId=${userId}&password=${password}`;
  console.log("hi there");
  // console.log("userId", userId);
  // console.log("password", password);

  const response = await fetch(`${apiUrl}?${queryParams}`, {
    method: 'POST',
    // mode: 'no-cors', // Not recommended for production
    credentials: 'include',
    headers: {
      Authorization: `Basic ${base64Credentials}`,
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json',
    },
  });

  console.log("apiUrl",apiUrl)
  // const response = await axios.post(`${apiUrl}?${queryParams}`, null, {
  //   headers: {
  //     Authorization: `Basic ${base64Credentials}`,
  //     'Content-Type': 'application/json',
  //   },
  // });


  if (response.status === 200) {
    console.log('Login successful!', response.data);
    // Perform any additional actions after successful login
  } else {
    console.error('Login failed. Please check your credentials.');
    // Handle unsuccessful login (show error message, etc.)
  }
} catch (error) {
  console.error('An error occurred during login:', error.message);
  // Handle other errors (network issues, server errors, etc.)
}
};

  return (
    <div style={{}}>
      <h1 style={{ color: "blue", textAlign: "center" }}>Welcome to OMS</h1>
      {/* <h1 className='check'>check </h1> */}
      <div class="login-box">
        <h2>Login</h2>
        <form>
          <div class="user-box">
            <input
              type="text"
              name="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <label>Username</label>
          </div>
          <div class="user-box">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          {/* <a >Login</a> */}
        </form>
        <br />
        <button onClick={handleLogin} type="button" class="btn btn-info">
          Login
        </button>
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
