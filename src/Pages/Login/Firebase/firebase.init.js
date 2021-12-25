
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";


const firebaseInitializeApplication = () => {

    return initializeApp(firebaseConfig);
}

export default firebaseInitializeApplication;