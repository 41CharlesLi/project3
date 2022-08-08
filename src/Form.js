import React, { useState } from "react";

const initialInputs = {
    characterName: "",
    characterBackstory: "",
    characterClass: "",
};

const Form = ({ handleSubmit }) => {
    const [inputs, setInputs] = useState(initialInputs);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInputs({
            ...inputs,
            [id]: value,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="postForm">
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
        </form>
    );
};

export default Form;
