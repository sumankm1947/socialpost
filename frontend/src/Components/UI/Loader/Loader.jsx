// import React from "react";
import React from "react";
import ReactDOM from "react-dom";

import classes from "./Loader.module.css";

const Loader = () => {
  const targetElement = document.getElementById("overlays");
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <div className={classes.loading__page}>
          <div className={classes.loading__circle}></div>
        </div>,
        targetElement
      )}
    </React.Fragment>
  );
};

export default Loader;
