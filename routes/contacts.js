const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {check, validationResult} = require("express-validator/check");
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
router.put("/:id", auth, (req, res) => {
  const {name, email, phone, type} = req.body;

  // Build the contact object
  const contactFields = {};
  for (field of Object.keys(req.body)) {
    if (req.body[field] !== null) contactFields[field] = req.body[field];
  }
});

//@route  DELETE api/contacts/id
//@desc   Delete a user's contact
//@access Private
router.delete("/:id", (req, res) => {
  res.send("Delete a contact");
});

router.delete("/:id");
module.exports = router;
