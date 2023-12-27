// App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Product from './pages/product';
import LoginProvider from "./Context/LoginProvider";
import CreateOrder from "./pages/createOrder";

const App = () => {

  return (
    <Router>
      <LoginProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/createOrder" element={<CreateOrder />} />


        </Routes>
      </LoginProvider>
    </Router>
  );
};

export default App;
