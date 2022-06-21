import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBncnVY33lGAlCBiNkgisCwsBb9qNY7scg",
  authDomain: "malaria-detection-kf.firebaseapp.com",
  projectId: "malaria-detection-kf",
  storageBucket: "malaria-detection-kf.appspot.com",
  messagingSenderId: "844638395544",
  appId: "1:844638395544:web:c79eb533461a388af284ed",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);
const database = getDatabase(firebase);

export { firebase, storage, database };
