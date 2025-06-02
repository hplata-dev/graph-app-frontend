import React, { useEffect, useState } from "react";
import { useGetGraphsQuery, useLazyGetGraphQuery } from "../redux/api/graphApi";
import buildGraph from "../helpers/buildGraph";

export default function FormCard({ setGraph }) {
  const { data: graphs, isLoading: isLoadingGraphs } = useGetGraphsQuery();
  const [graphId, setGraphId] = useState("");

  const [getGraph, { data: graph, isLoading: isLoadingGraph }] =
    useLazyGetGraphQuery();

  const handleSubmit = (e) => {
    e.preventDefault();
    getGraph(graphId);
  };

  useEffect(() => {
    if (graph) {
      const graphData = buildGraph(graph.graph.Edges);
      setGraph(graphData);
    }
  }, [graph, setGraph]);

  return (
    <div className="card">
      <div className="card-body ">
        <form onSubmit={handleSubmit} className="d-flex gap-2">
          <select
            className="form-select"
            onChange={(e) => setGraphId(e.target.value)}
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
            className="btn btn-primary"
            disabled={isLoadingGraph}
          >
            {isLoadingGraph ? "Loading..." : "Select"}
          </button>
        </form>
      </div>
    </div>
  );
}
