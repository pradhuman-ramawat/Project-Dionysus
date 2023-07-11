import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyCZVxZyndN7Er4vq9Rk4l7OZwz--3TVOAg",
  authDomain: "project-dionysus-1.firebaseapp.com",
  projectId: "project-dionysus-1",
  storageBucket: "project-dionysus-1.appspot.com",
  messagingSenderId: "330115413401",
  appId: "1:330115413401:web:47d5b42db763c252758f08",
};

// Initialize Firebase
// * Represents the Firebase Connection.
const app = initializeApp(firebaseConfig);

// * Represents Authenticated Users
export const auth = getAuth(app);
// * Represents Auth Provider
export const provider = new GoogleAuthProvider();

// // * Google SignIn
// export const signInWithGoogle = () => {
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       const name = result.user.displayName;
//       const email = result.user.email;
//       const profilePic = result.user.photoURL;

//       localStorage.setItem("name", name);
//       localStorage.setItem("email", email);
//       localStorage.setItem("profilePic", profilePic);

//       //Set Auth State to true
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
