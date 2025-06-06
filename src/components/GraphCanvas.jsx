import React from 'react';
import Graph from 'react-vis-graph-wrapper';

export default function GraphCanvas({ graph, setNetwork }) {
  const options = {
    layout: { hierarchical: false, improvedLayout: true },
    nodes: {
      shape: 'dot',
      borderWidth: 2,
      borderWidthSelected: 4,
      color: {
        background: '#00aaff',
        border: '#005577',
        hover: {
          background: '#00ccff',
          border: '#004466',
        },
        highlight: {
          background: '#00ddff',
          border: '#003344',
        },
      },
      scaling: {
        min: 15,
        max: 100,
      },
      font: {
        color: '#222222',
        size: 14,
        face: 'Arial',
        strokeWidth: 2,
        strokeColor: '#ffffff',
        background: 'transparent',
      },
      shadow: {
        enabled: true,
        color: 'rgba(0,0,0,0.3)',
        size: 10,
        x: 5,
        y: 5,
      },
    },
    edges: {
      color: {
        inherit: true,
      },
      width: 2,
      selectionWidth: 3,
      arrows: {
        to: { enabled: true, type: 'arrow', scaleFactor: 0.6 },
      },
      smooth: {
        enabled: true,
        type: 'cubicBezier',
        forceDirection: 'horizontal',
        roundness: 0.3,
      },
      font: {
        color: '#333333',
        size: 12,
        face: 'Arial',
        background: 'rgba(255, 255, 255, 0.7)',
        strokeWidth: 0,
        align: 'middle',
      },
    },
    physics: {
      barnesHut: {
        gravitationalConstant: -8000,
        springLength: 200,
        springConstant: 0.001,
      },
      stabilization: { iterations: 250 },
    },
    interaction: {
      hover: true,
      tooltipDelay: 200,
      hideEdgesOnDrag: true,
      zoomView: true,
      dragView: true,
      hoverConnectedEdges: true,
      selectable: true,
    },
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Graph
        graph={graph}
        options={options}
        style={{ width: '100%', height: '100%' }}
        getNetwork={(network) => {
          setNetwork(network);
        }}
      />
    </div>
  );
}
