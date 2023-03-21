import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import createError from "../utils/createError.js";

//Register for new user
export const registerController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return next(createError(400, "email already exist!"));
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
};

//Login for current user
export const signinController = async (req, res, next) => {
  const { email } = req.body;
  try {
    const currentUser = await User.findOne({ email });
    if (!currentUser) {
      return next(createError(400, "Incorrect email!"));
    }
    //encrypt password
    const currentPassword = await bcrypt.compare(
      req.body.password,
      currentUser.password
    );

    if (!currentPassword) {
      return next(createError(400, "Incorrect password!"));
    }

    const payload = {
      user: {
        id: currentUser._id,
        isSeller: currentUser.isSeller,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_KEY,

      (err, token) => {
        if (err) {
          return next(createError(401, "jwt token error!"));
        }
        const { password, ...others } = currentUser._doc;

        res.status(200).json({
          token,
          user: { ...others },
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      errorMessage: "Server Error.",
    });
  }
};

//logout user
export const logoutController = (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logout!");
};

///::::::::::: This is my another system for getting jwt token this system generate a token from backend site as a response value:::::::::::/// this token not come from frontend site as a headers it's come from backend site as a response value::::::::::///

// if (!currentPassword) {
//   return next(createError(400, "Incorrect password!"));
// }

// const token = jwt.sign(
//   {
//     id: currentUser._id,
//     isSeller: currentUser.isSeller,
//   },
//   process.env.JWT_KEY
// );

// const { password, ...others } = currentUser._doc;

// res
//   .cookie("accessToken", token, {
//     httpOnly: true,
//   })
//   .status(200)
//   .send(others);
// } catch (err) {
// next(err);
// }
