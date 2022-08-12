import React, { useState, useEffect } from "react";
import firebase, { auth } from "./firebase-config";
import { getDatabase, ref, onValue, remove } from "firebase/database";

const BlogSection = ({ isAuth }) => {
    const [postList, setPostList] = useState([]);

    //useEffect to init database fetch and onValue to listen for changes to metadata
    useEffect(() => {
        const database = getDatabase(firebase);
        const dbRef = ref(database);

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

    const handleRemovePost = (id) => {
        //this function needs to take one argument representing location of post being removed
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/${id}`); //`/${id}` is location of the info
        remove(dbRef);
    };

    return (
        <ul className="blogSection">
            {postList.map((post) => {
                return (
                    <div className="characterCard" key={post.key}>
                        <li className="postItem">
                            <h2>{post.characterName}</h2>
                            <h3>{post.characterClass}</h3>
                            <p>{post.characterBackstory}</p>
                            <h3>@{post.author ? post.author : "anonymous"}</h3>
                            {/* if current user id matches the id or the authorId OR the user is anon, they can use delete function */}
                            {((isAuth &&
                                post.authorId === auth.currentUser.uid) ||
                                auth.currentUser.displayName === null) && (
                                <button
                                    className="deleteButton"
                                    onClick={() => {
                                        handleRemovePost(post.key);
                                    }}
                                >
                                    Remove Post
                                </button>
                            )}
                        </li>
                    </div>
                );
            })}
        </ul>
    );
};

export default BlogSection;
