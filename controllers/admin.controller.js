import User from "../models/admin.model.js";
import bcryptpass from "bcrypt";
import jwt from "jsonwebtoken";
import { where } from "sequelize";

const JWT_SECRET = "##$@!@#%$^WEFS$#%2dsfse^354423#@$WE$wer5435W$5";

export const sign_up = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      name === "" ||
      password === "" ||
      email === ""
    ) {
      return 400, "All fields are rquired!";
    }

    const passwordHashed = await bcryptpass.hash(password, 11);

    const addUser = await User.create({
      name,
      email,
      password: passwordHashed,
    });

    await addUser.save();

    res.status(201).json({ message: "User successfully created!" });
  } catch (error) {
    console.error("Error creating user:", error);
    next(error);
  }
};

// export const signin = async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password || email === "" || password === "") {
//     return 400, "All fields are rquired!";
//   }

//   try {
//     const userValid = await User.findOne({ where: { email } });
//     if (!userValid) {
//       return next(errHandler(404, "User not found!"));
//     }
//     const passwordValid = bcryptpass.compareSync(password, userValid.password);

//     if (!passwordValid) {
//       return 400, "Invalid Password!";
//     }

//     const token = jwt.sign({ userId: userValid._id }, process.env.JWT_SECRET);

//     const { password: pass, ...rest } = userValid._doc;

//     res.status(200).cookie("access_token", token).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    // Find the user by email
    const userValid = await User.findOne({
      where: { email }, // Use `where` clause
    });

    if (!userValid) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Validate the password
    const passwordValid = bcryptpass.compareSync(password, userValid.password);

    if (!passwordValid) {
      return res.status(400).json({ error: "Invalid Password!" });
    }

    // Check if JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      throw new Error(
        "JWT_SECRET is not defined in your environment variables!"
      );
    }

    // Generate JWT token
    const token = jwt.sign({ userId: userValid.id }, process.env.JWT_SECRET);

    // Exclude password from response
    const { password: pass, ...rest } = userValid.toJSON();

    // Return success response with token
    res.status(200).cookie("access_token", token).json(rest);
  } catch (error) {
    next(error);
  }
};
