const express = require("express");
const Users = require("../model/Users");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const {check, validationResult} = require("express-validator");
const router = express.Router();

//@route POST api/users
//@desc  Register a user
//@access Public

router.post(
  "/",
  [
    check("name", "name is required")
      .not()
      .isEmpty(),
    check("email", "Email is require").isEmail(),
    check(
      "password",
      "At least 6 characters for password is required "
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    // check if email existed.
    const {name, email, password} = req.body;
    try {
      let user = await Users.findOne({email});
      if (user) {
        return res.status(400).json({msg: "User already exists."});
      }
      const salt = await bcrypt.genSalt(10);

      user = new Users({
        name,
        email,
        password: await bcrypt.hash(password, salt)
      });
      //save to database
      await user.save();
      // send back a token for user logged in
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {expiresIn: 3600},
        (err, token) => {
          if (err) throw err;
          res.json({token});
        }
      );
    } catch (err) {
      console.error(err.message);
    }
  }
);

module.exports = router;
