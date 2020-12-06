import React from "react";
import Header from "../common/header/Header.common";

export default function CompWrapper(props) {
  const { children } = props;
  return (
    <div className="compwrapper-container">
      <Header/>
      <div className="compwrapper">{children}</div>
    </div>
  );
}
