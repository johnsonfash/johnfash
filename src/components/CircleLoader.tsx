import React from "react";
import { Spinner } from "reactstrap";

function CircleLoader({ height = "100vh" }: { height?: string }) {
  return (
    <div
      className="w-100 d-flex justify-content-center align-items-center"
      style={{ height }}
    >
      <Spinner color="primary" />
    </div>
  );
}

export default CircleLoader;
