import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEKX_oGDHngyhF4bZwRGuPBncHaZaLD90",
  authDomain: "sloba-ecommerce-store.firebaseapp.com",
  projectId: "sloba-ecommerce-store",
  storageBucket: "sloba-ecommerce-store.appspot.com",
  messagingSenderId: "828801623830",
  appId: "1:828801623830:web:5f68fa50e55b33618dd237",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(); //database

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid); //userAuth.uid is a unique identifier of every user, users is a collection that we create

  const userSnapshot = await getDoc(userDocRef);

  //if user data doesn't exist
  if (!userSnapshot.exists()) {
    //create /set the document with the data from userAuth in my collection
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error creating the user: ", error.message);
    }
  }

  //if user data exists
  return userDocRef;
};
