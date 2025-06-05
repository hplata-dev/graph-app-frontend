import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-5">
      <h1 className="display-1 fw-bold text-dark mb-4">404</h1>
      <p className="fs-4 mb-4">
        Sorry, the page you're looking for could not be found.
      </p>
      <Link to="/" className="btn btn-outline-dark btn-lg">
        Go Home
      </Link>
    </div>
  );
}
