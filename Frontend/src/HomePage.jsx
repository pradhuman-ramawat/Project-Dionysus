import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = ({ token }) => {
  useEffect(() => {
    if (token) {
      // fetchData(token);
    }
  }, [token]);

  const headers = {};

  const fetchData = async (token) => {
    axios({
      url: `http://localhost:5000/auth/gsignup`,
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
  };

  return (
    <>
      <p>{token}</p>
      <h2>Name: {localStorage.getItem("name")}</h2>
      <h2>Email: {localStorage.getItem("email")}</h2>
      <img src={localStorage.getItem("profilePic")} />
    </>
  );
};

export default HomePage;
