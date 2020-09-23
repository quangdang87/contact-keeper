const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Users = require("../model/Users");

const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const {check, validationResult} = require("express-validator");
//@GET  GET api/auth
//@desc GET user logged in
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@POST   POST api/auth
//@desc   Auth user and get token
//@access Public
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required.").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: error.array()});
    }
    const {email, password} = req.body;
    try {
      let user = await Users.findOne({email});
      if (!user) {
        return res.status(400).json({msg: "Invalid credentials."});
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({msg: "Invalid credentials."});
      }
      const payload = {user: {id: user.id}};
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {expiresIn: 3600},
        async (err, token) => {
          if (err) throw err;
          return res.json({token});
        }
      );
    } catch (err) {
      console.error(err.messgage);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
