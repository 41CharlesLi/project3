import React from "react";
import BlogSection from "../BlogSection";
import Intro from "../Intro";

function Home({ isAuth }) {
    return (
        <main>
            {/* <div className="wrapper"> */}
            {isAuth ? <BlogSection isAuth={isAuth} /> : <Intro />}
            {/* </div> */}
        </main>
    );
}

export default Home;
