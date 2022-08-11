import React from "react";
import BlogSection from "../BlogSection";
import Intro from "../Intro";

function Home({ isAuth }) {
    return <div>{isAuth ? <BlogSection /> : <Intro />}</div>;
}

export default Home;
