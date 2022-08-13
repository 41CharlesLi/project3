import React, { useState, useEffect } from "react";
import firebase, { auth } from "./firebase-config";
import { getDatabase, ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import sword from "./assets/sword.png";

const Form = ({ isAuth }) => {
    let navigate = useNavigate();

    //create object where we are storing user inputs as well as their login name and id
    const initialInputs = {
        characterName: "",
        characterBackstory: "",
        characterClass: "",
        author: {
            name: auth.currentUser.displayName,
            id: auth.currentUser.uid,
        },
    };

    const [inputs, setInputs] = useState(initialInputs);

    //function to create a post and push to database. Afterwards, inputs are reset to empty string
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
                author: {
                    name: "",
                    id: "",
                },
            });
            navigate("/");
        }
    };

    //function to handle each change in input form
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
        <main>
            <div className="wrapper">
                <div className="formContainer">
                    <h1 className="formHeading"> Create a Post</h1>
                    <form onSubmit={createPost} className="postForm">
                        <label htmlFor="characterName">Character's name</label>
                        <input
                            type="text"
                            id="characterName"
                            onChange={handleInputChange}
                            value={inputs.characterName}
                            required
                        ></input>
                        <label htmlFor="characterClass">
                            Character's class
                        </label>
                        <input
                            type="text"
                            id="characterClass"
                            onChange={handleInputChange}
                            value={inputs.characterClass}
                            required
                        ></input>
                        <label htmlFor="characterName">
                            Character's backstory
                        </label>
                        <textarea
                            id="characterBackstory"
                            onChange={handleInputChange}
                            value={inputs.characterBackstory}
                            rows="10"
                            cols="33"
                            required
                        ></textarea>
                        <button className="submitButton">
                            <div className="buttonElContainer">
                                <img
                                    src={sword}
                                    alt="a sword"
                                    className="submitImg"
                                ></img>
                                Submit
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Form;
