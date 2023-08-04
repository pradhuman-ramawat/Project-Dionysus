const express = require("express");
const router = express.Router();
const admin = require("../config/firebase-config");
const User = require("../models/User");

const decodeToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  //console.log(`Token: ${token}`);
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

router.get("/wishlist", decodeToken, async (req, res) => {
  try {
    let email = req.decodeToken.email;
    let user = await User.find({ email: email });
    if (!user.length) {
      return res.status(400).send("User does not exist");
    }
    user = user[0];
    console.log(user);
      return res.status(200).json({
        wishlist: user.Wishlist,
      });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.put("/wishlist", decodeToken, async (req, res) => {
  try {
    let email = req.decodeToken.email;
    let user = await User.find({ email: email });
    user = user[0];
      let wishlist = user.Wishlist;
      wishlist.push({
        slug: req.body.WL.slug,
        gameID: parseInt(req.body.WL.gameID),
        steamID: req.body.WL.steamID,
      });
      console.log(wishlist);
      await user.save();
      return res.status(200).json({
        message: "Wishlist Updated Successfully",
      });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

router.delete("/wishlist", decodeToken, async (req, res) => {
  try {
    var email = req.decodeToken.email;
    var user = await User.find({ email: email });
    user = user[0];
     var wishlist = user.Wishlist;
      for (i = 0; i < wishlist.length; i++) {
        let entry = wishlist[i];
        if (entry.gameID === parseInt(req.body.WL.gameID)) {
          wishlist.splice(i, 1);
        }
      }
      await user.save();
      return res.status(200).json({
        message: "Item Removed From Wishlist",
        wishlist: user.Wishlist,
      }); 
    } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

module.exports = router;
