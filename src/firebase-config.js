// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCW0SoZGPAHFrqU18OJE9M5uijU1Ay8NNg",
    authDomain: "dungeons-and-dragons-7b93e.firebaseapp.com",
    projectId: "dungeons-and-dragons-7b93e",
    storageBucket: "dungeons-and-dragons-7b93e.appspot.com",
    messagingSenderId: "931805715642",
    appId: "1:931805715642:web:b06e467274c1607e95f683",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
