import React, { useState, useEffect } from "react";
import firebase from "./firebase-config";
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
            name: localStorage.getItem("userName"),
            id: localStorage.getItem("userId"),
            //was auth.currentUser.uid BUT createPost page would break on refresh
            //because it couldn't get auth details fast enough(?). Saved username to local
            //storage
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
    }, [isAuth]);

    return (
        <main>
            <div className="wrapper">
                <div className="formContainer" id="form">
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
                        <select
                            id="characterClass"
                            name="characterClass"
                            className="characterClassInput"
                            onChange={handleInputChange}
                            value={inputs.characterClass}
                            required
                        >
                            <option value="">Choose a class</option>
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
