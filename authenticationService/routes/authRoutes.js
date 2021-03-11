const passport = require("passport");
const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const UserCredentialsModel = require("../database/models/UserCredentials");
const { issueJWT, registerUser } = require("../lib/authentication");

/**
 * @method GET
 * @route  /api/auth/verify
 * @desc   Verifies a bearer token.
 * @access private
 */
router.get(
  "/verify",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res
      .status(200)
      .json({ success: true, valid: true, userID: req.user.user_id });
  }
);

/**
 * @method POST
 * @route  /api/auth/login
 * @desc   Login a existing user and returns a bearer token.
 * @access public
 */
router.post("/login", (req, res) => {
  UserCredentialsModel.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      res.status(401).json({ success: false, error: "User isnt registered" });
    }

    const isValid = bcrypt.compareSync(req.body.password, user.password);

    if (isValid) {
      const token = issueJWT(user);

      return res.status(200).json({
        success: true,
        token: token,
        expiresIn: token.expires,
        userID: user.user_id,
      });
    } else {
      return res
        .status(401)
        .json({ success: false, error: "Username/Password is invalid" });
    }
  });
});

/**
 * @method POST
 * @route  /api/auth/register
 * @desc   Registers a new user.
 * @access public
 */
router.post(
  "/register",
  [
    body("username", "Username is required").not().isEmpty(),
    body("password", "Password is required").not().isEmpty(),
    body("password2", "Second password is required").not().isEmpty(),
    body("firstName", "First name is required").not().isEmpty(),
    body("lastName", "Last name is required").not().isEmpty(),
    body("email", "Email is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array });
    }

    const {
      username,
      password,
      password2,
      firstName,
      lastName,
      email,
    } = req.body;

    const registerResponse = await registerUser({
      username,
      password,
      password2,
      firstName,
      lastName,
      email,
    });

    if (registerResponse.success === false) {
      return res.status(400).json(registerResponse.error);
    } else {
      return res.status(400).json(registerResponse);
    }
  }
);

module.exports = router;
