import React, { useState, useEffect } from "react";
import firebase from "./firebase-config";
import { getDatabase, ref, onValue, remove } from "firebase/database";

const BlogSection = () => {
    const [postList, setPostList] = useState([]);

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
                    characterBackstory: data[key.characterBackstory],
                });
            }
            setPostList(newState);
        });
    }, []);
    const handleRemovePost = (id) => {
        //this function needs to take one argument representing location of post being removed
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/${id}`);
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
                            <button
                                className="deleteButton"
                                onClick={() => {
                                    handleRemovePost(post.key);
                                }}
                            >
                                Remove Post
                            </button>
                        </li>
                    </div>
                );
            })}
        </ul>
    );
};

export default BlogSection;
