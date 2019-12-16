import React from "react";

const ErrDisplayer = ({ err }) => {
  return (
    <div>
      <h4>ERROR</h4>
      <h5>{err}</h5>
    </div>
  );
};

export default ErrDisplayer;
