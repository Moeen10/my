import firebaseInitializeApplication from "../Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';


firebaseInitializeApplication();
const useFirebase = () => {
   
    const history = useHistory();
    const redirect_url =   "/"
    const [user, setUser] = useState({});
    const [admin, setAdmin] = useState(false)
    const [error, setError] = useState('');
    const [isLoading, setISloading] = useState(true);

    const auth = getAuth();



    // Sign Up With Email Password
    const signUpWithEmailPassword = (email, password) => {
        setISloading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    // log in with email and password
    const signInWithEmailPassword = (email, password) => {
        setISloading(true)

        return signInWithEmailAndPassword(auth, email, password)

    }


    // look over to the  current user
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)

            } else {
                setUser({})
            }
            setISloading(false)
        });
    }, [auth])




//  checking user is admin or not
    useEffect(() => {
        const url = `https://morning-chamber-73182.herokuapp.com/user/${user.email}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setAdmin(data.isAdmin)
            })

    }, [user.email])




    // log out
    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            history.push(redirect_url)

        }).catch((error) => {
            // An error happened.
        })

    }




    return {
        user,
        setUser,
        signUpWithEmailPassword,
        signInWithEmailPassword,
        error,
        setError,
        logOut,
        isLoading,
        setISloading,
        admin


    }

}

export default useFirebase;