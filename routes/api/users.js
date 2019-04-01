const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateWorkInput = require("../../validation/workhours");

const User = require("../../models/User");

//Get all working hours
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user.workhours);
  }
);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    res.json(req.user);
  }
);

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log("login");
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        };

        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post(
  "/workhours",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateWorkInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newW = {
      description: req.body.description,
      hours: req.body.hours,
      onDate: req.body.onDate
    };

    req.user.workhours.unshift(newW);

    req.user.save().then(res.json(req.user));
  }
);

router.delete(
  "/workhours/:w_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const removeIndex = req.user.workhours
      .map(item => item.id)
      .indexOf(req.params.w_id);

   
    req.user.workhours.splice(removeIndex, 1);
    console.log("delete");
   
    req.user
      .save()
      .then(user => res.json(req.user))
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
