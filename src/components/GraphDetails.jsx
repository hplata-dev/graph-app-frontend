import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useGetGraphQuery,
  useUpdateGraphMutation,
} from "../redux/api/graphApi";
import Loader from "./Loader";
import toast from "react-hot-toast";

export default function GraphDetails() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();

  const { data: graph, isLoading } = useGetGraphQuery(id);

  const navigate = useNavigate();

  const [
    updateGraph,
    { isLoading: isUpdating, error: updateError, isSuccess: isUpdated },
  ] = useUpdateGraphMutation();

  useEffect(() => {
    if (graph) {
      setName(graph.graph.name);
      setDescription(graph.graph.description);
    }
  }, [graph]);

  useEffect(() => {
    if (updateError) toast.error("Error updating graph");
    if (isUpdated) toast.success("Graph updated successfully");
  }, [updateError, isUpdated]);

  if (isLoading) return <Loader />;

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!name || !description) {
      toast.error("Please fill all fields");
      return;
    }

    updateGraph({ id, name, description });
    navigate("/create");
  };

  return (
    <div className="container">
      <h1>Graph Details</h1>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
