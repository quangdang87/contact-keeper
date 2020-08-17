const express = require("express");
const router = express.Router();

//@GET  GET api/auth
//@desc GET user logged in
//@access Private
router.get("/", (req, res) => {
  res.send("Get user logged in.");
});

//@POST   POST api/auth
//@desc   Auth user and get token
//@access Public
router.post("/", (req, res) => {
  res.send("Auth user and get token.");
});

module.exports = router;
