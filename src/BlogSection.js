import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase-config";

const BlogSection = () => {
    const [postList, setPostList] = useState([]);
    const postCollectionRef = collection(db, "posts");

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postCollectionRef);
            setPostList(
                data.docs.map((doc) => {
                    return {
                        ...doc.data(),
                    };
                })
            );
        };
        getPosts();
        console.log(postList);
    }, []);
    return (
        <ul className="blogSection">
            {postList.map((post) => {
                return (
                    <div className="characterCard">
                        <li>
                            <h2>{post.characterName}</h2>
                            <h3>{post.characterClass}</h3>
                            <p>{post.characterBackstory}</p>
                        </li>
                    </div>
                );
            })}
        </ul>
    );
};

export default BlogSection;
