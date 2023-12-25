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

  console.log("userId", userId);
  console.log("password", password);

  //error handleing
  const [error, setError] = useState(null);
  //useContext api
  // const { isLoggedIn, setIsLoggedIn } = useLogin();
  // const history = useHistory();
  //loading
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      
      const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);
      const response = await fetch('http://103.209.40.121:6565/api/HomeApi/Login?networkId=U21080273&password=1234567',{
          method: "POST",
          mode: 'no-cors',
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: authHeader,
          },
          
        },
        
      );
 
      const result = await response.json();
      console.log("rst", result);
    } catch (error) {
      console.error("Login Error:", error);
    } 
  };

  // const handleLogin = async () => {
  //   try {
  //     setIsLoading(true);
  //     const authHeader = "Basic " + base64.encode(USERNAME + ":" + PASSWORD);

  //     const response = await axios.post(
  //       `${BASE_URL}/api/HomeApi/Login`,
  //       {
  //         networkId: userId,
  //         password: password,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: authHeader,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       const result = response.data;

  //       if (result.EmpId) {
  //         // Handle successful login
  //         alert("Login Successfully");
  //       } else {
  //         // Handle login failure
  //         console.log("Login failed:", result);
  //       }
  //     } else {
  //       // Handle non-successful response (e.g., 401 Unauthorized)
  //       console.error("Request failed with status", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Login Error:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div style={{  }}>
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
