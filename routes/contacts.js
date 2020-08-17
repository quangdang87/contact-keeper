const express = require("express");
const router = express.Router();

//@route  GET api/contacts
//@desc   Get all user's contacts
//@access Private
router.get("/", (req, res) => {
  res.send("Get all user's contact.");
});

//@route  POST api/contacts
//@desc   Add new contacts
//@access Private
router.get("/", (req, res) => {
  res.send("Add a new contact.");
});

//@route  PUT api/contacts/id
//@desc   Edit a user's contact
//@access Private
router.put("/:id", (req, res) => {
  res.send("Edit a contact");
});

//@route  DELETE api/contacts/id
//@desc   Delete a user's contact
//@access Private
router.delete("/:id", (req, res) => {
  res.send("Delete a contact");
});

router.delete("/:id");
module.exports = router;
