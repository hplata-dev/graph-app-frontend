import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [],
  edges: [],
};

const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setNodes: (state, action) => {
      const { id, name, label } = action.payload;
      state.nodes.push({
        id,
        label: name,
        title: label,
      });
    },
    setEdges: (state, action) => {
      const { from, to } = action.payload;
      const id = `${from}-${to}`;
      state.edges.push({
        id,
        from,
        to,
      });
    },
    removeNode: (state, action) => {
      state.nodes = state.nodes.filter((node) => node.id !== action.payload);
      state.edges = state.edges.filter(
        (edge) => edge.from !== action.payload && edge.to !== action.payload
      );
    },
    removeEdge: (state, action) => {
      state.edges = state.edges.filter((edge) => edge.id !== action.payload);
    },
  },
});

export const { setNodes, setEdges, removeNode, removeEdge } =
  graphSlice.actions;

export default graphSlice.reducer;
