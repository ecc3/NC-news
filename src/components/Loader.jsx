import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

const Loader = () => {
  return (
    <div className="loader">
      <h2>LOADING</h2>
      <PulseLoader color={"#4056a1"} />
    </div>
  );
};

export default Loader;
