import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { getDatabase, set, ref } from "firebase/database";

const DisplayCard = ({ allPosts, userChoice, isAuth, handleRemovePost }) => {
    const [editState, setEditState] = useState(false);

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
    const [postKey, setPostKey] = useState("");

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
    //if user choice is an empty string, return all items in our database
    //else filter database by userchoice and return
    if (userChoice === "") {
        return allPosts.map((post) => {
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
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>
                                    <button
                                        className="deleteButton"
                                        onClick={() => {
                                            handleRemovePost(post.key);
                                        }}
                                    >
                                        <i className="fa-solid fa-trash"></i>
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
                                        <i class="fa-solid fa-ban"></i>
                                    </button>
                                    <button
                                        className="deleteButton"
                                        onClick={() => {
                                            submitEdit(post.key);
                                        }}
                                    >
                                        <i class="fa-solid fa-paper-plane"></i>
                                    </button>
                                </div>
                            )}
                    </li>
                </div>
            );
        });
    } else {
        const filteredPosts = allPosts.filter((post) => {
            return post.characterClass === userChoice;
        });

        // if there's nothing in the filtered array, return error message
        if (filteredPosts.length === 0) {
            return <p> nothing to show </p>;
        } else {
            return filteredPosts.map((post) => {
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
                            {/* if current user id matches the id or the authorId OR the user is anon, they can use delete function */}
                            {isAuth &&
                                post.authorId ===
                                    localStorage.getItem("userId") &&
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
                                                console.log(
                                                    e.target.parentElement
                                                        .attributes[1].value
                                                );
                                            }}
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button
                                            className="deleteButton"
                                            onClick={() => {
                                                handleRemovePost(post.key);
                                            }}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                )}

                            {isAuth &&
                                post.authorId ===
                                    localStorage.getItem("userId") &&
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
                                            <i className="fa-solid fa-ban"></i>
                                        </button>
                                        <button
                                            className="deleteButton"
                                            onClick={() => {
                                                submitEdit(post.key);
                                            }}
                                        >
                                            <i className="fa-solid fa-paper-plane"></i>
                                        </button>
                                    </div>
                                )}
                        </li>
                    </div>
                );
            });
        }
    }
};

export default DisplayCard;
