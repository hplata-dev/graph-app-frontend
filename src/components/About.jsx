import React from "react";
import MetaData from "./MetaData";

export default function About() {
  return (
    <>
      <MetaData title="About" />
      <div className="container">
        <h1>About</h1>
        <p>
          This is a graph visualization application that allows you to create
          and visualize nodes and their connections.
        </p>
      </div>
    </>
  );
}
