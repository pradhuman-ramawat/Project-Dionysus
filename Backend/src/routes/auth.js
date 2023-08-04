const express = require("express");
const router = express.Router();
const admin = require("../config/firebase-config");
const User = require("../models/User");

const decodeToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(`Token: ${token}`);
  try {
    // * Decode Token Value using Firebase Admin Functions
    const decodeValue = await admin.auth().verifyIdToken(token);
    if (decodeValue) {
      req.decodeToken = decodeValue;
      return next();
    }
  } catch (err) {
    console.log(err);
    return res.json({
      message: "Internal Error",
    });
  }
};

router.post("/signup", decodeToken, async (req, res) => {
  let user;
  try {
    if (req.decodeToken.firebase.sign_in_provider === "password") {
      console.log("Custom SignUp");
      user = new User({
        _id: req.decodeToken.uid,
        email: req.decodeToken.email,
        PhoneNumber: null,
        FName: req.body.FName,
        LName: req.body.LName,
        AuthType: "email",
        Wishlist: [],
        isAdmin: false,
      });
    }
    // * If not custom sign-up, return error.
    else {
      return res.status(400).json({
        message: "Not a Valid Provider",
      });
    }
    user = await user.save();
    console.log(user);
    return res.status(200).json({
      message: "Sign-Up Successful",
    });
  } catch (err) {
    console.log(err.message);
    if (err.code === 11000) {
      return res.status(409).json({
        message: "User Already Exists",
      });
    }

    return res.status(400).json({
      message: "SignUp Failed",
    });
  }
});

router.post("/gsignup", decodeToken, async (req, res) => {
  // console.log(req.decodeToken);
  try {
    if (req.decodeToken.firebase.sign_in_provider === "google.com") {
      // TODO Find Customer from DB
      let existUser = null;
      console.log("Reached Here");
      existUser = await User.find({email: req.decodeToken.email});
      if (existUser == null) {
        let user = new User({
          _id: req.decodeToken.uid,
          email: req.decodeToken.email,
          PhoneNumber: null,
          FName: req.body.FName,
          LName: req.body.LName,
          AuthType: "google",
          Wishlist: [],
          isAdmin: false,
        });
        // Create customer and save to DB.
        console.log(user);
        user
          .save()
          .then((savedUser) => {
            user = savedUser;
          })
          .catch((err) => {
            console.log(err);
          });
        return res.status(200).json({
          message: "Sign-Up Successful",
        });
      } else {
        return res.status(200).json({
          message: "Profile Complete",
        });
      }
    } else {
      // * If not google sign-up, return error.
      return res.status(400).json({
        message: "Not a Valid Provider",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Some Error Occured",
    });
  }
});

module.exports = router;
