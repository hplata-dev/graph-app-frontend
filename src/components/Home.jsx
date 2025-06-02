import React, { useState } from "react";
import MetaData from "./MetaData";
import FormCard from "./FormCard";
import GraphCanvas from "./GraphCanvas";

export default function Home() {
  const [graph, setGraph] = useState({ nodes: [], edges: [] });

  return (
    <>
      <MetaData title="Home" />
      <div className="container-fluid" style={{ height: "calc(100vh - 56px)" }}>
        <div className="row h-100">
          <div className="col-12 col-md-3 h-100">
            <FormCard setGraph={setGraph} />
          </div>
          <div className="col-12 col-md-9 h-100">
            <GraphCanvas graph={graph} />
          </div>
        </div>
      </div>
    </>
  );
}
