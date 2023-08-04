import { useEffect, useState } from "react";
import { Box, Button, HStack, IconButton, Flex, Menu, Avatar, MenuButton, MenuList, MenuItem, Text, Divider } from "@chakra-ui/react";
import HomePage from "./HomePage";
import { Search, dataLoader } from "./components/Search/Search";
import Details from "./components/Details/Details";
import Wishlist from "./components/Wishlist/Wishlist";
import Register from "./components/Register/Register";
import Genre from "./components/Genre/Genre";
import Developer from "./components/Developer/Developer";
import WishlistItem from "./components/Wishlist/WishlistItem";
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
  useNavigate,
} from "react-router-dom";

const App = () => {
  const [authenticated, setAuthenticated] = useState(
    false || window.localStorage.getItem("authenticated") === "true"
  );
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  // localStorage.setItem("wishlist", []);

  // const [registerEmail, setRegisterEmail] = useState("");
  // const [registerPassword, setRegisterPassword] = useState("");

  // const [loginEmail, setLoginEmail] = useState("");
  // const [loginPassword, setLoginPassword] = useState("");

  // useEffect(() => {
  //   auth.onAuthStateChanged((userCred) => {
  //     if (userCred) {
  //       setUser(userCred);
  //       setAuthenticated(true);
  //       window.localStorage.setItem("authenticated", "true");
  //       userCred.getIdToken().then((token) => {
  //         setToken(token);
  //       });
  //     }
  //   });
  // }, []);

  // // * Google SignIn
  // const signInWithGoogle = () => {
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       if (result) {
  //         const name = result.user.displayName;
  //         const email = result.user.email;
  //         const profilePic = result.user.photoURL;

  //         localStorage.setItem("name", name);
  //         localStorage.setItem("email", email);
  //         localStorage.setItem("profilePic", profilePic);

  //         //Set Auth State to true
  //         setAuthenticated(true);
  //         window.localStorage.setItem("authenticated", "true");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // // * SignUp/Register With Email
  // const signUpWithEmail = async () => {
  //   console.log("Sign Up Email");
  //   try {
  //     const userCredentials = await createUserWithEmailAndPassword(
  //       auth,
  //       registerEmail,
  //       registerPassword
  //     );

  //     console.log(userCredentials);
  //     const name = userCredentials.user.displayName;
  //     const email = userCredentials.user.email;
  //     const profilePic = userCredentials.user.photoURL;

  //     localStorage.setItem("name", name);
  //     localStorage.setItem("email", email);
  //     localStorage.setItem("profilePic", profilePic);

  //     //Set Auth State to true
  //     setAuthenticated(true);
  //     window.localStorage.setItem("authenticated", "true");

  //     axios({
  //       url: `http://localhost:5000/auth/signup`,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       method: "POST",
  //     })
  //       .then((res) => console.log(res))
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } catch (err) {
  //     console.log(err.code);
  //     console.log(err.message);
  //   }
  // };

  // // * Login With Email
  // const signInWithEmail = async () => {
  //   console.log(loginEmail, loginPassword);
  //   try {
  //     const userCredentials = await signInWithEmailAndPassword(
  //       auth,
  //       loginEmail,
  //       loginPassword
  //     );

  //     console.log(userCredentials);
  //     const name = userCredentials.user.displayName;
  //     const email = userCredentials.user.email;
  //     const profilePic = userCredentials.user.photoURL;

  //     localStorage.setItem("name", name);
  //     localStorage.setItem("email", email);
  //     localStorage.setItem("profilePic", profilePic);

  //     //Set Auth State to true
  //     setAuthenticated(true);
  //     window.localStorage.setItem("authenticated", "true");
  //   } catch (err) {
  //     console.log(err.code);
  //     console.log(err.message);
  //   }
  // };

  // const logout = async () => {
  //   await signOut(auth);
  //   localStorage.removeItem("name");
  //   localStorage.removeItem("email");
  //   localStorage.removeItem("profilePic");
  //   localStorage.setItem("authenticated", false);
  //   localStorage.setItem("token", "");
  // };

  //Router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage token={token} />} />
        <Route path="/search" element={<Search />} /*loader={dataLoader}*/ />
        <Route path="/details/:gameid/:slug" element={<Details />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/genre/:genrename/:genreid" element={<Genre />} />
        <Route path="/dev/:devId/:devName" element={<Developer />} />
      </Route>
    )
  );

  return (
    <Box bg="gray.800" w="100%" minH="100vh" height="100%">
      <RouterProvider router={router} />
      <h1 color="white">{token}</h1>
      {/* <WishlistItem /> */}
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
  // const [authenticated, setAuthenticated] = useState(
  //   false || window.localStorage.getItem("authenticated") === "true"
  // );
  const navigate = useNavigate();

  //const logout = Register.logout;
  const logout = async () => {
    signOut(auth).then(() => {
      console.log("SI OUT");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("wishlist");
      localStorage.removeItem("profilePic");
      localStorage.setItem("authenticated", false);
      localStorage.setItem("token", "");
      localStorage.setItem("user", {});
      // setToken("");
      // setUser({});
      // setRegisterEmail("");
      // setRegisterPassword("");
      // setLoginEmail("");
      // setLoginPassword("");
      navigate("/search");
      windows.location.reload();
    });
  };

  return (
    <>
    {/* Navbar Here */}
      <Box>
        <Box bg="gray.900" px={4}>
          <Flex h={16} alignItems="center" justifyContent="space-between">
            <HStack spacing={8} alignItems="center">  
                <Box color="white">
                  <Link to="/" style={{ color: "white" }}>
                    <Avatar size="sm" src="https://images.unsplash.com/photo-1554213352-5ffe6534af08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=385&q=80" >
                    </Avatar>
                  </Link>
                </Box>
              <HStack>
                <Link to="/search" style={{ color: "white" }}>
                  Search
                </Link>
                {/* <Link to="/explore" style={{ color: "white" }}>
                  Explore
                </Link> */}
              </HStack>
            </HStack>
              <Flex alignItems="center">
              {/* TODO Change Logout Button immeditely to signup/login */}
              {localStorage.getItem("authenticated") === "false" ? (
                <Link to="/register" style={{ color: "white" }}>
                  Sign-In
                </Link>
              ) : (
                <Menu>
                  <MenuButton as="button">
                    <Avatar size="sm" src={localStorage.getItem("profilePic")} />
                  </MenuButton>
                  <MenuList bgColor="gray.800" padding="1.5">
                    <MenuItem bgColor="gray.800" color="white">
                      <Link to="/wishlist">
                      View Wishlist
                      </Link>
                    </MenuItem>
                    <Divider />
                    <MenuItem bgColor="gray.800" color="white" onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              )}
                
              </Flex>
            </Flex>
        </Box>
      </Box>
      
      {/* Pages load Here. */}
      <Box>
        <Outlet />
      </Box>
      {/* Optional Footer Here. */}

      <Box>
        <Flex height="100%" width="100%" justifyContent="center" alignItems="center">
          {/* <Text color="white">Developed By Pradhuman Ramawat</Text> */}
        </Flex>
      </Box>
    </>
  );
};

export default App;
