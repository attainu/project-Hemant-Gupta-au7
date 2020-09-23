var express = require("express");
const mongoose = require("mongoose");
var Post = require("../models/post");
var requireLogin = require("../middleware/requireLogin");
var route = express.Router();

route.get("/allpost", requireLogin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((error) => {
      console.log(error);
    });
});

route.post("/createPost", requireLogin, (req, res) => {
  var { title, body, pic } = req.body;
  //console.log(title,body,pic)
  if (!title || !body || !pic) {
    return res.status(422).json({ error: "PLEASE ADD ALL THE FIELD" });
  }
  var post = new Post({
    title,
    body,
    photo: pic,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      //  console.log(result)
      res.json({ post: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

route.get("/mypost", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((mypost) => {
      res.status(200).json({ mypost });
    })
    .catch((error) => {
      console.log(error);
    });
});

//LIKE BUTTON
route.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

//UNLIKE ROUTE

route.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});


module.exports = route;
