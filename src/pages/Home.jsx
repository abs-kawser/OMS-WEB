import React from "react";
import { useLogin } from "../Context/LoginProvider";

const Home = () => {
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const { userDetails } = isLoggedIn;
  console.log("isLoggedIn", isLoggedIn);
  console.log("userDetails",userDetails);

  return (
    <div className="container-fluid">
      <h1>Full-Name:{userDetails?.FullName}</h1>
      <div className="row">

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {/* Your main content goes here */}
          <h1>Home</h1>
          {/* Add your home page content here */}
        </main>
      </div>
    </div>
  );
};

export default Home;
