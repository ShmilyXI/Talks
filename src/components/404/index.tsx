import React from "react";
import "./index.less";

const Index = () => {
  return (
    <div className="not-font-wrap">
      <p className="text-slate-600 text-5xl font-bold text-center mx-15 my-30">404 Error Page</p>
      <div className="zoom-area">
        <div>Uh oh! Looks like you got lost.</div>
        <div>Go back to the homepage if you dare!</div>
      </div>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container">
        <a href="/" className="more-link">
          Go Home
        </a>
      </div>
    </div>
  );
};

export default Index;
