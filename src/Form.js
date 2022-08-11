import React, { useState, useEffect } from "react";
import firebase from "./firebase-config";
import { getDatabase, ref, push } from "firebase/database";

const Form = ({ isAuth, navigate }) => {
    const initialInputs = {
        characterName: "",
        characterBackstory: "",
        characterClass: "",
    };

    const [inputs, setInputs] = useState(initialInputs);

    const createPost = (e) => {
        e.preventDefault();
        const database = getDatabase(firebase);
        const dbRef = ref(database);

        if (inputs) {
            push(dbRef, inputs);
            setInputs({
                characterName: "",
                characterBackstory: "",
                characterClass: "",
            });
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInputs({
            ...inputs,
            [id]: value,
        });
    };

    //function that prevents user from seeing login page if not logged in
    useEffect(() => {
        if (!isAuth) {
            window.location.pathname = "/login";
        }
    }, []);

    return (
        <main className="formContainer">
            <h1> Create a Post</h1>
            <form onSubmit={createPost} className="postForm">
                <label htmlFor="characterName">
                    Enter your character's name
                </label>
                <input
                    type="text"
                    id="characterName"
                    onChange={handleInputChange}
                    value={inputs.characterName}
                    required
                ></input>
                <label htmlFor="characterClass">
                    Enter your character's class
                </label>
                <input
                    type="text"
                    id="characterClass"
                    onChange={handleInputChange}
                    value={inputs.characterClass}
                    required
                ></input>
                <label htmlFor="characterName">
                    Enter your character's backstory
                </label>
                <textarea
                    id="characterBackstory"
                    onChange={handleInputChange}
                    value={inputs.characterBackstory}
                    rows="10"
                    cols="33"
                    required
                ></textarea>
                <button className="submitButton">Submit</button>
            </form>
        </main>
    );
};

export default Form;
