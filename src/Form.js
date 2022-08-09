import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase-config";

const Form = () => {
    const initialInputs = {
        characterName: "",
        characterBackstory: "",
        characterClass: "",
    };

    const [inputs, setInputs] = useState(initialInputs);

    const postsCollectionRef = collection(db, "posts");

    const createPost = async (e) => {
        e.preventDefault();
        await addDoc(postsCollectionRef, inputs);
        setInputs({
            characterName: "",
            characterBackstory: "",
            characterClass: "",
        });
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInputs({
            ...inputs,
            [id]: value,
        });
    };

    return (
        <form onSubmit={createPost} className="postForm">
            <label htmlFor="characterName">Enter your character's name</label>
            <input
                type="text"
                id="characterName"
                onChange={handleInputChange}
                value={inputs.characterName}
            ></input>
            <label htmlFor="characterClass">Enter your character's class</label>
            <input
                type="text"
                id="characterClass"
                onChange={handleInputChange}
                value={inputs.characterClass}
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
            ></textarea>
            <button>Submit</button>
        </form>
    );
};

export default Form;
