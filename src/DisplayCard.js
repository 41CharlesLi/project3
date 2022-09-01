import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import { getDatabase, set, ref } from "firebase/database";

const DisplayCard = ({ allPosts, isAuth, handleRemovePost }) => {
    const [editState, setEditState] = useState(false);
    const [postData, setPostData] = useState([]);
    const [postKey, setPostKey] = useState("");

    useEffect(() => {
        setPostData(allPosts);
    }, [allPosts]);

    //create a state of postData
    //create a useEffect that'll set check the length of AllPosts, if more than 10, slice array and set to postData,
    //otherwise, postData = allPosts
    //import prop of page number
    // on blogsection page, render next button only if array is more than 10
    const initialInputs = {
        characterName: "",
        characterBackstory: "",
        characterClass: "",
        author: {
            name: localStorage.getItem("userName"),
            id: localStorage.getItem("userId"),
            //was auth.currentUser.uid BUT createPost page would break on refresh
            //because it couldn't get auth details fast enough(?). Saved username to local
            //storage
        },
    };
    const [inputs, setInputs] = useState(initialInputs);

    //sets inputs to values living within each card element and sets postKey in state so that
    //it can be compared to the postID of the element clicked on.
    const handleEditState = (postId, post) => {
        setEditState(!editState);
        setPostKey(postId);
        setInputs({
            characterName: post.characterName,
            characterBackstory: post.characterBackstory,
            characterClass: post.characterClass,
            author: {
                name: localStorage.getItem("userName"),
                id: localStorage.getItem("userId"),
                //was auth.currentUser.uid BUT createPost page would break on refresh
                //because it couldn't get auth details fast enough(?). Saved username to local
                //storage
            },
        });
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInputs({
            ...inputs,
            [id]: value,
        });
    };

    //pushes changes to database
    const submitEdit = (postId) => {
        setEditState(!editState);
        const database = getDatabase();
        const dbRef = ref(database, postId);

        set(dbRef, inputs);
    };

    //if postData has length, display cards otherwise show error message
    if (postData.length >= 1) {
        return postData.map((post) => {
            return (
                <div className="characterCard" key={post.key}>
                    <li className="postItem">
                        {editState && post.key === postKey ? (
                            <input
                                type="text"
                                defaultValue={post.characterName}
                                onChange={handleInputChange}
                                id="characterName"
                            ></input>
                        ) : (
                            <h2 className="characterName">
                                {post.characterName}
                            </h2>
                        )}
                        {editState && post.key === postKey ? (
                            <Dropdown
                                handleInputChange={handleInputChange}
                                inputs={inputs}
                                id="characterClass"
                            />
                        ) : (
                            <h3 className="characterClass">
                                {post.characterClass}
                            </h3>
                        )}
                        {editState && post.key === postKey ? (
                            <textarea
                                defaultValue={post.characterBackstory}
                                onChange={handleInputChange}
                                id="characterBackstory"
                                className="editTxtArea"
                            ></textarea>
                        ) : (
                            <p className="characterBackstory">
                                {post.characterBackstory}
                            </p>
                        )}
                        <h3 className="characterAuthor">
                            @{post.author ? post.author : "anonymous"}
                        </h3>
                        {/* if current user id matches the id of the post or the authorId OR the user + author of post is anon, they can use delete function */}
                        {isAuth &&
                            post.authorId === localStorage.getItem("userId") &&
                            !editState && (
                                <div className="buttonContainer">
                                    <button
                                        className="editButton"
                                        postid={post.key}
                                        onClick={(e) => {
                                            handleEditState(
                                                e.target.parentElement
                                                    .attributes[1].value,
                                                post
                                            );
                                        }}
                                    >
                                        <i className="fa-solid whiteBtn fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        className="deleteButton"
                                        onClick={() => {
                                            handleRemovePost(post.key);
                                        }}
                                    >
                                        <i className="fa-solid whiteBtn fa-trash"></i>
                                    </button>
                                </div>
                            )}

                        {isAuth &&
                            post.authorId === localStorage.getItem("userId") &&
                            editState &&
                            post.key === postKey && (
                                <div className="buttonContainer">
                                    <button
                                        className="editButton"
                                        postid={post.key}
                                        onClick={(e) => {
                                            setEditState();
                                        }}
                                    >
                                        <i className="fa-solid whiteBtn fa-ban"></i>
                                    </button>
                                    <button
                                        className="deleteButton"
                                        onClick={() => {
                                            submitEdit(post.key);
                                        }}
                                    >
                                        <i class="fa-solid whiteBtn fa-paper-plane"></i>
                                    </button>
                                </div>
                            )}
                    </li>
                </div>
            );
        });
    } else {
        return <h2>nothing to show</h2>;
    }
};

export default DisplayCard;
