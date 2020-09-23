const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {check, validationResult} = require("express-validator");
const Users = require("../model/Users");
const Contacts = require("../model/Contacts");

//@route  GET api/contacts
//@desc   Get all user's contacts
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    const contact = await Contacts.find({user: req.user.id}).sort({date: -1});
    res.json({contact});
  } catch (err) {
    console.error(err.message);
    res.send("Server Error.");
  }
});

//@route  POST api/contacts
//@desc   Add new contacts
//@access Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const {name, email, phone, type} = req.body;
    try {
      const newContact = new Contacts({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();
      return res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error.");
    }
  }
);

//@route  PUT api/contacts/id
//@desc   Edit a user's contact
//@access Private
router.put("/:id", auth, async (req, res) => {
  // Build the contact object
  const contactFields = {};
  for (field of Object.keys(req.body)) {
    if (req.body[field] !== null) contactFields[field] = req.body[field];
  }
  try {
    let contact = await Contacts.findById(req.params.id);
    if (!contact) return res.json(404).json({msg: "Contact not found."});
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({msg: "Not Authorized."});
    // update
    console.log("Contact: ", contact);
    console.log("ContactFields: ", contactFields);
    contact = await Contacts.findByIdAndUpdate(
      req.params.id,
      {$set: contactFields},
      {new: true}
    );
    console.log("here:", contact);
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

//@route  DELETE api/contacts/id
//@desc   Delete a user's contact
//@access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // find the record
    let contact = await Contacts.findById(req.params.id);
    if (!contact) return res.status(404).json({msg: "Contact not found."});
    // check if the user own this record
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({msg: "Not Authorized"});
    //delete it
    contact = await Contacts.findByIdAndDelete(req.params.id);
    console.log(contact);
    return res.json({msg: "Contact Removed."});
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error.");
  }
});
module.exports = router;
