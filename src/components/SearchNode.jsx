import React, { useState } from "react";
import toast from "react-hot-toast";

export default function SearchNode({ graph, network }) {
  const [nodeId, setNodeId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nodeId) {
      toast.error("Please select a graph first!");
      return;
    }

    network.focus(nodeId, {
      scale: 5,
      locked: true,
      animation: {
        duration: 500,
        easingFunction: "easeInOutQuad",
      },
    });
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <form onSubmit={handleSubmit} className="d-flex gap-2">
          <select
            className="form-select border-primary"
            onChange={(e) => setNodeId(e.target.value)}
            style={{ borderColor: "#0070D2" }}
          >
            <option value="">Select a node</option>
            {graph?.nodes?.map((node) => (
              <option key={node.id} value={node.id}>
                {node.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="btn text-white"
            style={{ backgroundColor: "#0070D2" }}
          >
            Select
          </button>
        </form>
      </div>
    </div>
  );
}
