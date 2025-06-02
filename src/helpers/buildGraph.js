const buildGraph = (data) => {
  // 1) collect unique node values
  const nodeSet = new Set();
  data.forEach(({ source_node, target_node }) => {
    nodeSet.add(source_node);
    nodeSet.add(target_node);
  });

  // 2) make an array so we can enumerate with real indexes
  const nodesArray = Array.from(nodeSet);

  // 3) map each node value → its index in nodesArray
  const nodeToId = {};
  nodesArray.forEach((node, idx) => {
    nodeToId[node] = idx;
  });

  // 4) build your nodes with { id, label }
  const nodes = nodesArray.map((node, idx) => ({
    id: idx,
    label: node,
  }));

  // 5) build edges with vis’s required keys: from & to
  const edges = data.map(({ source_node, target_node }) => ({
    from: nodeToId[source_node],
    to: nodeToId[target_node],
  }));

  return { nodes, edges };
};

export default buildGraph;
