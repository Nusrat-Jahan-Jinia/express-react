// internal imports
const User = require("../models/People");

// external imports
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

// get login page
function getLogin(req, res, next) {
  res.render("index");
}

async function login(req, res, next) {
  try {
    // check username, email or username
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        // prepare the user object to generate token
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };
        // generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });
        // set logged in user local identification
        res.locals.loggedInUser = userObject;
        res.render("inbox");
      } else {
        throw createError("Login failed! PLease try again.");
      }
    } else {
      throw createError("Login failed! PLease try again.");
    }
  } catch (err) {
    res.render("inbox", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}
module.exports = {
  getLogin,
  login,
};
