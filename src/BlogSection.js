import React, { useState, useEffect, useRef } from "react";
import firebase, { auth } from "./firebase-config";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import DisplayCard from "./DisplayCard";
import Dropdown from "./Dropdown";

const BlogSection = ({ isAuth }) => {
    const [postList, setPostList] = useState([]);
    const [userChoice, setUserChoice] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    //useEffect to init database fetch and onValue to listen for changes to metadata
    const blogEl = useRef(null);

    useEffect(() => {
        const database = getDatabase(firebase);
        const dbRef = ref(database);

        //saves userName and userId into local storage. Form.js breaks on refresh if values are not available
        if (localStorage.getItem("userName") === null) {
            localStorage.setItem("userName", "anonymous");
            localStorage.setItem("userId", "anonymous");
        }

        const executeScroll = () => {
            blogEl.current.scrollIntoView();
        };
        executeScroll();

        onValue(dbRef, (response) => {
            const newState = [];
            const data = response.val();
            for (let key in data) {
                newState.push({
                    key: key,
                    characterName: data[key].characterName,
                    characterClass: data[key].characterClass,
                    characterBackstory: data[key].characterBackstory,
                    author: data[key].author.name,
                    authorId: data[key].author.id,
                });
            }
            setPostList(newState);
        });
    }, []);

    const handleUserChoice = (e) => {
        setUserChoice(e.target.value);
        setPageNumber(0);
        //sets page number to zero to resolve bug with pagination
    };

    const handleRemovePost = (id) => {
        //this function needs to take one argument representing location of post being removed
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/${id}`);
        remove(dbRef);
    };

    const nextPage = () => {
        let numberOfArrays = Math.ceil(postList.length / 9);
        if (pageNumber === numberOfArrays - 1) {
            return;
        }
        setPageNumber(pageNumber + 1);
    };

    const previousPage = () => {
        if (pageNumber === 0) {
            return;
        }
        setPageNumber(pageNumber - 1);
    };

    return (
        <section>
            <div className="wrapper">
                <div className="blogSectionContainer">
                    <div className="blogHeadingContainer">
                        <h2>List of Builds</h2>
                    </div>
                    <form className="buildSelectForm">
                        <h2 className="selectFormHeading">
                            Filter Builds by Class
                        </h2>
                        <Dropdown
                            handleInputChange={handleUserChoice}
                            value={userChoice}
                            id="filterClass"
                            name="filterClass"
                        />
                    </form>

                    <ul className="blogPosts" ref={blogEl}>
                        <DisplayCard
                            allPosts={postList}
                            userChoice={userChoice}
                            isAuth={isAuth}
                            auth={auth}
                            handleRemovePost={handleRemovePost}
                            pageNumber={pageNumber}
                        />
                    </ul>
                    <div className="paginationBtnContainer">
                        <button
                            onClick={() => {
                                previousPage();
                            }}
                            className="pageBtn"
                        >
                            PREV
                        </button>
                        <button
                            onClick={() => {
                                nextPage();
                            }}
                            className="pageBtn"
                        >
                            NEXT
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
