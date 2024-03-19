
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDjL4qGSyrW1LPaP8R5r1zv7ACIyX4ug1E",
  authDomain: "netflix-clone-297cc.firebaseapp.com",
  projectId: "netflix-clone-297cc",
  storageBucket: "netflix-clone-297cc.appspot.com",
  messagingSenderId: "77590737768",
  appId: "1:77590737768:web:c7844dedd746ea314b1cdd",
  measurementId: "G-363Y9JW0TC"
};


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };