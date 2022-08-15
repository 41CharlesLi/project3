import React from "react";
import scroll from "./assets/scroll.png";

export default function Instructions() {
    return (
        <section className="intro">
            <div className="wrapper">
                <div className="introContainer">
                    <div className="imgContainer">
                        <img src={scroll} alt="scroll" className="scrollImg" />
                    </div>
                    <div className="introTxtContainer">
                        <div className="introHeadingContainer">
                            <h2 className="introHeading">How to Use:</h2>
                        </div>
                        <ol>
                            <li>
                                <p className="rules">
                                    Please login to see posts
                                </p>
                            </li>
                            <li>
                                <p className="rules">
                                    Post a RPG character that you've created and
                                    want to show off to the community
                                </p>
                            </li>
                            <li>
                                <p className="rules">
                                    Avoid overly profane language in your
                                    descriptions
                                </p>
                            </li>
                            <li>
                                <p className="rules">
                                    Please respect the feelings of others at all
                                    times
                                </p>
                            </li>
                            <li>
                                <p className="rules">
                                    Admin reserves the right to delete posts
                                    without warning
                                </p>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}
