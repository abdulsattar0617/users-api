const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const User = require("../Models/User");


// DELETE - single user
router.delete("/:id/delete", async (req, res) => {
  try {
    let { id } = req.params;
    let objId = new ObjectId(id);
    // await User.deleteOne({ _id: objId });
    await User.findByIdAndDelete(id); 
    res.send("User successfully deleted!");
  } catch (err) {
    res.status(500).send("Ops ! something went wrong, please try again later.");
  }
});

// UPDATE - single user
router.patch("/:id/edit", async (req, res) => {
  try {
    let { id } = req.params;
    let { name, email, age } = req.body; 
    
    let update = {name, email, age}; 
    let options = {
      new: true 
    }

    let updatedUser = await User.findByIdAndUpdate(id, update, options);   

    res.status(200).send("User successfully updated!"); 
  } catch (err) {
    res.status(500).send("Ops ! something went wrong, please try again later.");
  }
});

// GET - single user
router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;

    let objId = new ObjectId(id);

    let user = await User.findOne({ _id: objId });

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(400).send("User not found!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Ops ! something went wrong, please try again later.");
  }
});

// GET - see all users
router.get("/", async (req, res) => {
  try {
    let users = await User.find();
    // res.send(users);
    res.render('../templates/users.ejs', { users : users }); 
  } catch (err) {
    console.log(err);
    res.status(500).send("Ops ! something went wrong, please try again later.");
    
  }
});

// POST - Create new User
router.post("/", async (req, res) => {
  try {
    let { name, email, age } = req.body;
    console.log(name, email, age);
    let user = new User({ name, email, age });
    await user.save();
    res.status(200).send("User saved!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Ops ! something went wrong, please try again later.");
  }
});

module.exports = router;
