import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light text-center p-3">
      <h1 className="display-1 fw-bold text-primary mb-0">404</h1>
      <p className="fs-3 mb-2">
        <span className="text-danger">Oops!</span> Page not found.
      </p>
      <p className="lead mb-4">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary btn-lg">
        ← Back to Home
      </Link>
    </div>
  );
}
