const buildGraph = (data) => {
  // 1) collect unique node values
  const datasetSet = new Set(data.map(({ dataset }) => dataset));
  const datasetArray = Array.from(datasetSet);
  const datasetToId = {};
  datasetArray.forEach((dataset, idx) => {
    datasetToId[dataset] = idx;
  });

  const nodeSet = new Set();
  const nodeValues = new Map();
  const nodeTitles = new Map();
  const nodeDatasets = new Map();
  data.forEach(({ source_node, target_node, dataset }) => {
    nodeSet.add(source_node);

    if (!nodeValues.has(source_node)) {
      nodeValues.set(source_node, 1);
    } else {
      nodeValues.set(source_node, nodeValues.get(source_node) + 1);
    }

    if (!nodeDatasets.has(source_node)) {
      nodeDatasets.set(source_node, datasetToId[dataset]);
    }

    if (!nodeTitles.has(source_node)) {
      nodeTitles.set(source_node, source_node);
    }
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
    value: nodeValues.get(node) || 0,
    group: nodeDatasets.get(node) || 0,
  }));

  // 5) build edges with vis’s required keys: from & to
  const edges = data.map(({ source_node, target_node }) => ({
    from: nodeToId[source_node],
    to: nodeToId[target_node],
  }));

  return { nodes, edges };
};

export default buildGraph;
