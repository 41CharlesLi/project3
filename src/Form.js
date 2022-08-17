import React, { useState, useEffect, useRef } from "react";
import firebase from "./firebase-config";
import { getDatabase, ref, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import sword from "./assets/sword.png";
import Filter from "bad-words";
import Dropdown from "./Dropdown";

const Form = ({ isAuth }) => {
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
    let navigate = useNavigate();
    const filter = new Filter();
    const formEl = useRef(null);

    //function to create a post and push to database. Afterwards, inputs are reset to empty string
    const createPost = (e) => {
        e.preventDefault();
        const database = getDatabase(firebase);
        const dbRef = ref(database);
        if (
            filter.isProfane(inputs.characterName) ||
            filter.isProfane(inputs.characterBackstory)
        ) {
            alert("Watch your language, friend");
            return;
        }
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
        const executeScroll = () => {
            formEl.current.scrollIntoView();
        };
        executeScroll();
    }, [isAuth]);

    return (
        <main>
            <div className="wrapper">
                <div className="formContainer" id="form" ref={formEl}>
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
                        <Dropdown
                            handleInputChange={handleInputChange}
                            inputs={inputs.characterClass}
                            value={inputs.characterClass}
                        />
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
