import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import { toastErrorNotify, toastSuccessNotify, toastWarnNotify } from "../helper/ToastNotify";

export const AuthContext = createContext();


const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("user")) || "")
  const navigate = useNavigate()

    useEffect(() => {
      userObserver()
    }, [])
    
  const createUser = async (email, password, displayName) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {displayName:displayName})
      navigate("/")
      toastSuccessNotify("Registered successfully!")
    } catch (error) {
      toastErrorNotify(error.message)
    }
  };


  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
      toastSuccessNotify("Logged in successfully!")

    } catch (error) {
      toastErrorNotify(error.message)
    }
  };

  const logOut = () => {
    signOut(auth);
    navigate("/")
    toastSuccessNotify("Logged out successfully!")
  };

  const userObserver = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const {email,displayName,photoURL}= user
        setCurrentUser({email,displayName,photoURL})
        sessionStorage.setItem("user", JSON.stringify({email,displayName,photoURL}))
      } else {
        setCurrentUser(false)
        sessionStorage.clear()
      }
    });
  }


  const signUpProvider = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/");
        toastSuccessNotify("Logged in successfully!");
      })
      .catch((error) => {
        toastErrorNotify(error.message);
      });
  };

  const forgotPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toastWarnNotify("Please check your mail box!");
      })
      .catch((err) => {
        toastErrorNotify(err.message);
      });
  };

  const values = { createUser, signIn, logOut, signUpProvider,currentUser, forgotPassword };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
