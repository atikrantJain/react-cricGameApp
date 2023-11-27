import React from "react";

class Loader extends React.Component {
  render() {
    return (
      <div className="full-screen-loader">
        <div className="loader-content">
          {/* Your loader content goes here */}
          Loading...
        </div>
      </div>
    );
  }
}

export default Loader;
