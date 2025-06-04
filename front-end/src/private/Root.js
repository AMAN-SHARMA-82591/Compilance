import React from "react";
import { Outlet } from "react-router";
import TopBar from "./components/nav/TopBar";
import LeftBar from "./components/LeftBar";

function Root() {
  return (
    <>
      <TopBar />
      <LeftBar />
      <div style={{ margin: "60px 0 0 83px" }}>
        <Outlet />
      </div>
    </>
  );
}

export default Root;
