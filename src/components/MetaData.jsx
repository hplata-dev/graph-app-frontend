import React from "react";
import { Helmet } from "react-helmet";

export default function MetaData({ title }) {
  return (
    <Helmet>
      <title>{title} - Graph App</title>
      <meta name="title" content={`${title} - Graph App`} />
    </Helmet>
  );
}
