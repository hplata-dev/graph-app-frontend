const buildGraph = (data) => {
  const datasetSet = new Set(data.map(({ dataset }) => dataset));
  const datasetArray = Array.from(datasetSet);
  const datasetToId = {};
  datasetArray.forEach((dataset, idx) => {
    datasetToId[dataset] = idx;
  });

  const nodeSet = new Set();
  const nodeValues = new Map();
  const nodeDatasets = new Map();

  data.forEach(({ source_node, target_node, dataset }) => {
    nodeSet.add(source_node);
    nodeSet.add(target_node);

    if (!nodeValues.has(source_node)) {
      nodeValues.set(source_node, 10);
    } else {
      nodeValues.set(source_node, nodeValues.get(source_node) + 10);
    }
    if (!nodeDatasets.has(source_node)) {
      nodeDatasets.set(source_node, datasetToId[dataset]);
    }
  });

  const nodesArray = Array.from(nodeSet);

  const nodeToId = {};
  nodesArray.forEach((node, idx) => {
    nodeToId[node] = idx;
  });

  const nodes = nodesArray.map((nodeName, idx) => ({
    id: idx,
    label: nodeName,
    value: nodeValues.get(nodeName) || 0,
    group: nodeDatasets.get(nodeName) || 0,
  }));

  const edges = data.map(({ source_node, target_node, dataset }) => ({
    from: nodeToId[source_node],
    to: nodeToId[target_node],
    label: String(dataset),
  }));

  return { nodes, edges };
};

export default buildGraph;
