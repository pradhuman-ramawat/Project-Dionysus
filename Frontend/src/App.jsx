import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import HomePage from "./HomePage";
import { Search, dataLoader } from "./components/Search/Search";
import Details from "./components/Details/Details";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, provider } from "./Firebase";
import axios from "axios";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";

const App = () => {
  const [authenticated, setAuthenticated] = useState(
    false || window.localStorage.getItem("authenticated") === "true"
  );
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        setUser(userCred);
        setAuthenticated(true);
        window.localStorage.setItem("authenticated", "true");
        userCred.getIdToken().then((token) => {
          setToken(token);
        });
      }
    });
  }, []);

  // * Google SignIn
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        if (result) {
          const name = result.user.displayName;
          const email = result.user.email;
          const profilePic = result.user.photoURL;

          localStorage.setItem("name", name);
          localStorage.setItem("email", email);
          localStorage.setItem("profilePic", profilePic);

          //Set Auth State to true
          setAuthenticated(true);
          window.localStorage.setItem("authenticated", "true");
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
      const name = userCredentials.user.displayName;
      const email = userCredentials.user.email;
      const profilePic = userCredentials.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);

      //Set Auth State to true
      setAuthenticated(true);
      window.localStorage.setItem("authenticated", "true");

      axios({
        url: `http://localhost:5000/auth/signup`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((res) => console.log(res))
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
      const name = userCredentials.user.displayName;
      const email = userCredentials.user.email;
      const profilePic = userCredentials.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);

      //Set Auth State to true
      setAuthenticated(true);
      window.localStorage.setItem("authenticated", "true");
    } catch (err) {
      console.log(err.code);
      console.log(err.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("profilePic");
    localStorage.setItem("authenticated", false);
    localStorage.setItem("token", "");
  };

  //Router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage />} />
        <Route path="/search" element={<Search />} /*loader={dataLoader}*/ />
        <Route path="/details/:gameid/:slug" element={<Details />} />
      </Route>
    )
  );

  return (
    <Box bg="gray.800">
      <RouterProvider router={router} />
      {/* <div>
        <SignUpForm
          setRegisterEmail={setRegisterEmail}
          setRegisterPassword={setRegisterPassword}
          signUpWithEmail={signUpWithEmail}
          signInWithGoogle={signInWithGoogle}
        />
      </div> */}
      {/* <div>
        <SignInForm
          setLoginEmail={setLoginEmail}
          setLoginPassword={setLoginPassword}
          signInWithEmail={signInWithEmail}
          signInWithGoogle={signInWithGoogle}
        />
      </div> */}
      {/* <div>
        <h3>Register User</h3>
        <input
          placeholder="Email"
          onChange={(event) => setRegisterEmail(event.target.value)}
        />
        <input
          placeholder="Password"
          onChange={(event) => setRegisterPassword(event.target.value)}
        />
        <button onClick={signUpWithEmail}>Create User</button>
      </div>

      <div>
        <h3>Login</h3>
        <input
          placeholder="Email"
          onChange={(event) => setLoginEmail(event.target.value)}
        />
        <input
          placeholder="Password"
          onChange={(event) => setLoginPassword(event.target.value)}
        />
        <button onClick={signInWithEmail}>Login</button>
      </div> */}

      {/* <button onClick={logout}>Sign Out</button> */}

      {/* {authenticated ? (
        <HomePage token={token} />
      ) : (
        <button onClick={signInWithGoogle}>Sign-In with Google</button>
      )} */}
    </Box>
  );
};

const Root = () => {
  return (
    <>
      //Navbar Here
      <div>
        <Link to="/search" style={{ color: "white" }}>
          Search
        </Link>
        <Link to="/details" style={{ color: "white" }}>
          Details
        </Link>
      </div>
      //Pages load Here.
      <div>
        <Outlet />
      </div>
      //Optional Footer Here.
    </>
  );
};

export default App;
