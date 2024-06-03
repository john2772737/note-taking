// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz6LXrqx-LDlLBnw_LElE4OmW8LXZvGdo",
  authDomain: "notetaking-e1d7b.firebaseapp.com",
  projectId: "notetaking-e1d7b",
  storageBucket: "notetaking-e1d7b.appspot.com",
  messagingSenderId: "684463689710",
  appId: "1:684463689710:web:d90ac82555c11bdc5e48ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth,app as default}