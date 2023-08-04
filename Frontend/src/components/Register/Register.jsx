import { useEffect, useState } from "react";
import { Box, Button, Flex, StackDivider, VStack } from "@chakra-ui/react";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, provider } from "../../Firebase";
import axios from "axios";
import SignInForm from "../../SignInForm";
import SignUpForm from "../../SignUpForm";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [authenticated, setAuthenticated] = useState(
    false || window.localStorage.getItem("authenticated") === "true"
  );
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [register, setRegister] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        setUser(userCred);
        setAuthenticated(true);
        localStorage.setItem("authenticated", "true");
        userCred.getIdToken().then((token) => {
          setToken(token);
          // console.log("TOKEN" + token);
        });
      }
    });
  });

  // * Google SignIn
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        if (result) {
          console.log("RESULT" + JSON.stringify(result));
          const name = result.user.displayName;
          const email = result.user.email;
          const profilePic = result.user.photoURL;
          
          localStorage.setItem("name", result.user.displayName);
          localStorage.setItem("email", result.user.email);
          localStorage.setItem("profilePic", result.user.photoURL);
          localStorage.setItem("token", result.user.stsTokenManager.accessToken);
          
          //Set Auth State to true
          setAuthenticated(true);
          localStorage.setItem("authenticated", "true");
          //console.log("Inside Google Login" + `${token}`);

          axios({
            url: `http://localhost:5000/auth/gsignup`,
            headers: {
              "Authorization": `Bearer ${result.user.stsTokenManager.accessToken}`,
              "Content-Type": "application/json",
            },
            method: "POST",
          })
            .then((res) => {
              axios({
                url: `http://localhost:5000/wish/wishlist`,
                headers: {
                  "Authorization": `Bearer ${result.user.stsTokenManager.accessToken}`,
                  "Content-Type": "application/json",
                },
                method: "GET",
              })
              .then((res) => {
                console.log("WISHLIST FROM BACKEND" + res.data.wishlist);
                localStorage.setItem("wishlist", JSON.stringify(res.data.wishlist));
              })
              .catch((err) => {
                console.log(err);
              })
              navigate("/search");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // * SignUp/Register With Email
  const signUpWithEmail = async () => {
    console.log("Sign Up Email");
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );

      console.log(userCredentials);
      
      localStorage.setItem("name", userCredentials.user.displayName);
      localStorage.setItem("email", userCredentials.user.email);
      localStorage.setItem("profilePic", userCredentials.user.photoURL);
      localStorage.setItem("token", userCredentials.user.accessToken);
      
      //Set Auth State to true
      setAuthenticated(true);
      window.localStorage.setItem("authenticated", "true");

      axios({
        url: `http://localhost:5000/auth/signup`,
        headers: {
          "Authorization": `Bearer ${userCredentials.user.accessToken}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((res) => {
          axios({
            url: `http://localhost:5000/wish/wishlist`,
            headers: {
              "Authorization": `Bearer ${result.user.stsTokenManager.accessToken}`,
              "Content-Type": "application/json",
            },
            method: "GET",
          })
          .then((res) => {
            console.log("WISHLIST FROM BACKEND" + res.data.wishlist);
            localStorage.setItem("wishlist", JSON.stringify(res.data.wishlist));
          })
          .catch((err) => {
            console.log(err);
          })
          navigate("/search");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.code);
      console.log(err.message);
    }
  };

  // * Login With Email
  const signInWithEmail = async () => {
    console.log(loginEmail, loginPassword);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      console.log(userCredentials);
      localStorage.setItem("name", userCredentials.user.displayName);
      localStorage.setItem("email", userCredentials.user.email);
      localStorage.setItem("profilePic", userCredentials.user.photoURL);
      localStorage.setItem("token", userCredentials.user.token);
      localStorage.setItem("wishlist", []);

      //Set Auth State to true
      setAuthenticated(true);
      window.localStorage.setItem("authenticated", "true");
      axios({
        url: `http://localhost:5000/wish/wishlist`,
        headers: {
          "Authorization": `Bearer ${result.user.stsTokenManager.accessToken}`,
          "Content-Type": "application/json",
        },
        method: "GET",
      })
      .then((res) => {
        console.log("WISHLIST FROM BACKEND" + res.data.wishlist);
        localStorage.setItem("wishlist", JSON.stringify(res.data.wishlist));
      })
      .catch((err) => {
        console.log(err);
      })
      navigate("/search");
    } catch (err) {
      console.log(err.code);
      console.log(err.message);
    }
  };

  // const logout = async () => {
  //   await signOut(auth);
  //   localStorage.removeItem("name");
  //   localStorage.removeItem("email");
  //   localStorage.removeItem("profilePic");
  //   localStorage.setItem("authenticated", false);
  //   localStorage.setItem("token", "");
  //   localStorage.setItem("user", {});
  //   setToken("");
  //   setUser({});
  //   setRegisterEmail("");
  //   setRegisterPassword("");
  //   setLoginEmail("");
  //   setLoginPassword("");
  //   navigate("/search");
  // };

  

  return (
    <>
      <VStack
        spacing={4}
        align='center'
        justify='center'
        margin={50}
      >
        <Button
          w={64}
          color="white"
          variant={"outline"}
          onClick={() => setRegister(!register)}
        >
          {register ? "Already A User? Login" : "Not a User? Register"}
        </Button>
        {register ? (
          <SignUpForm
          setRegisterEmail={setRegisterEmail}
          setRegisterPassword={setRegisterPassword}
          signUpWithEmail={signUpWithEmail}
          signInWithGoogle={signInWithGoogle}
          />
          ) : (
            <SignInForm
            setLoginEmail={setLoginEmail}
            setLoginPassword={setLoginPassword}
            signInWithEmail={signInWithEmail}
            signInWithGoogle={signInWithGoogle}
            />
            )}
      </VStack>
    </>
  );
};

export default Register;
