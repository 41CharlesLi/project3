import React, { useState, useEffect } from "react";
import firebase, { auth } from "./firebase-config";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import DisplayCard from "./DisplayCard";

const BlogSection = ({ isAuth }) => {
    const [postList, setPostList] = useState([]);
    // const [filteredList, setFilteredList] = useState([]);
    const [userChoice, setUserChoice] = useState("");
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

    const handleUserChoice = (e) => {
        setUserChoice(e.target.value);
    };

    const handleRemovePost = (id) => {
        //this function needs to take one argument representing location of post being removed
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/${id}`); //`/${id}` is location of the info
        remove(dbRef);
    };

    return (
        <main>
            <div className="wrapper">
                <div className="blogSectionContainer">
                    <div className="blogHeadingContainer">
                        <h2>List of Builds</h2>
                    </div>
                    <form className="buildSelectForm">
                        <h2 className="selectFormHeading">
                            Filter Builds by Class
                        </h2>
                        <select
                            id="filterClass"
                            name="filterClass"
                            onChange={handleUserChoice}
                            value={userChoice}
                        >
                            <option value="placeholder" disabled>
                                Pick one:
                            </option>
                            <option value="">All Classes</option>
                            <option value="Barbarian">Barbarian</option>
                            <option value="Bard">Bard</option>
                            <option value="Cleric">Cleric</option>
                            <option value="Druid">Druid</option>
                            <option value="Fighter">Fighter</option>
                            <option value="Monk">Monk</option>
                            <option value="Paladin">Paladin</option>
                            <option value="Ranger">Ranger</option>
                            <option value="Rogue">Rogue</option>
                            <option value="Sorcerer">Sorcerer</option>
                            <option value="Warlock">Warlock</option>
                            <option value="Artificer">Artificer</option>
                        </select>
                    </form>

                    <ul className="blogPosts">
                        <DisplayCard
                            allPosts={postList}
                            userChoice={userChoice}
                            isAuth={isAuth}
                            auth={auth}
                            handleRemovePost={handleRemovePost}
                        />
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default BlogSection;
