import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function SearchNode({ graph, network }) {
  const [nodeId, setNodeId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nodeId) {
      toast.error('Please select a graph');
      return;
    }

    network.focus(nodeId);
  };

  return (
    <div className="card">
      <div className="card-body ">
        <form onSubmit={handleSubmit} className="d-flex gap-2">
          <select
            className="form-select"
            onChange={(e) => setNodeId(e.target.value)}
          >
            <option value="">Select a graph</option>
            {graph?.nodes.map((node) => (
              <option key={node.id} value={node.id}>
                {node.label}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary">
            Select
          </button>
        </form>
      </div>
    </div>
  );
}
