import React, { useEffect, useState } from "react";
import { useGetGraphsQuery, useLazyGetGraphQuery } from "../redux/api/graphApi";
import buildGraph from "../helpers/buildGraph";
import toast from "react-hot-toast";

export default function FormCard({ setGraph }) {
  const { data: graphs, isLoading: isLoadingGraphs } = useGetGraphsQuery();
  const [graphId, setGraphId] = useState("");

  const [getGraph, { data: graph, isLoading: isLoadingGraph }] =
    useLazyGetGraphQuery();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!graphId) {
      toast.error("Please select a graph");
      return;
    }
    getGraph(graphId);
  };

  useEffect(() => {
    if (graph) {
      const graphData = buildGraph(graph.graph.Edges);
      setGraph(graphData);
    }
  }, [graph, setGraph]);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <form onSubmit={handleSubmit} className="d-flex gap-2">
          <select
            className="form-select border-primary"
            onChange={(e) => setGraphId(e.target.value)}
            style={{ borderColor: "#0070D2" }}
          >
            {isLoadingGraphs ? (
              <option value="">Loading...</option>
            ) : (
              <>
                <option value="">Select a graph</option>
                {graphs?.map((graph) => (
                  <option key={graph.id} value={graph.id}>
                    {graph.name}
                  </option>
                ))}
              </>
            )}
          </select>
          <button
            type="submit"
            className="btn text-white"
            style={{ backgroundColor: "#0070D2" }}
            disabled={isLoadingGraph}
          >
            {isLoadingGraph ? "Loading..." : "Select"}
          </button>
        </form>
      </div>
    </div>
  );
}
