import React, { useEffect } from "react";
import { useDeleteGraphMutation } from "../redux/api/graphApi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function GraphCard({ graph }) {
  const [deleteGraph, { isLoading, error, isSuccess }] =
    useDeleteGraphMutation();

  const handleDelete = () => deleteGraph(graph.id);

  useEffect(() => {
    if (error) toast.error("Error deleting graph");
    if (isSuccess) toast.success("Graph deleted successfully");
  }, [error, isSuccess]);

  return (
    <article
      className="card mb-3 shadow-sm"
      style={{ minWidth: "260px" }}
      aria-labelledby={`graph-title-${graph.id}`}
    >
      <div className="card-body d-flex flex-column p-3">
        <header className="mb-3">
          <h2
            id={`graph-title-${graph.id}`}
            className="h6 card-title mb-1 text-truncate"
            title={graph.name}
          >
            {graph.name}
          </h2>
          <p
            className="card-text small text-muted text-truncate"
            title={graph.description}
          >
            {graph.description}
          </p>
        </header>

        <footer className="mt-auto">
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-between">
            <Link
              to={`/graph/${graph.id}`}
              className="btn btn-outline-primary btn-sm flex-fill flex-sm-grow-1"
              aria-label={`View details for ${graph.name}`}
            >
              Details
            </Link>

            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="btn btn-outline-danger btn-sm flex-fill flex-sm-grow-1"
              aria-label={`Delete ${graph.name}`}
            >
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
}
