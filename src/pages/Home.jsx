import React from 'react';

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Bootstrap Sidebar */}
        <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div className="position-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link 1
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link 2
                </a>
              </li>
              {/* Add more sidebar items as needed */}
            </ul>
          </div>
        </nav>

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
