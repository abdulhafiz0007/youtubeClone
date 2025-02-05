import React, { useState } from "react";
import { Feed } from "../../components/Feed/Feed";
import { SideBar } from "../../components/SideBar/SideBar";
import "./home.css";

export const Home = ({ sidebar }) => {
  const [category, setCategory] = useState(0);

  return (
    <>
      <SideBar
        category={category}
        setCategory={setCategory}
        sidebar={sidebar}
      />
      <div className={`container ${sidebar ? "" : "large-container"}`}>
        <Feed category={category} />
      </div>
    </>
  );
};
