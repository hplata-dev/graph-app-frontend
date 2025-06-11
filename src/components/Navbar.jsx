import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav
        className="navbar navbar-expand-lg py-4 py-lg-0 shadow"
        style={{
          zIndex: 1030,
          backgroundColor: "#0070D2", // Salesforce Brand Blue
        }}
      >
        <div className="container px-4">
          <Link className="navbar-brand text-white fw-bold" to="/">
            Graph App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/create" ? "active fw-bold" : ""
                  } text-white`}
                  to="/create"
                >
                  Create Graph
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active fw-bold" : ""
                  } text-white`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="flex-grow-1">
        <Outlet />
      </div>
    </div>
  );
}
