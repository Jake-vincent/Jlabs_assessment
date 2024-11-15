import User from "../models/user_model.js";
import { createAccessToken } from "../modules/authenticator.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select(["-password", "-__v", "-_id"]);

    res.status(200).send({
      message: "List of users.",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.send({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userEmailExist = await User.findOne({ email });
    const nameExist = await User.findOne({ name });

    if (userEmailExist) {
      res.status(400).send({
        message: "User email already exists.",
      });
    } else if (nameExist) {
      res.status(400).send({
        message: "name already exists.",
      });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });

      // Validate form data
      if (!name || !email || !password) {
        return res.status(400).send({
          message: "All fields are required",
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).send({
          message: "Invalid email address",
        });
      }

      // Validate password strength
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).send({
          message:
            "Password must have at least 8 characters, uppercase, lowercase, number, and special characters",
        });
      }
      await newUser.save();

      res.status(201).send({
        message: "User created.",
        data: newUser,
      });
    }
  } catch (error) {
    console.error(error);
    res.send({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).send({
        message: "User not found.",
      });
    } else {
      const passwordMatched = await user.comparePassword(password);

      if (!passwordMatched) {
        res.status(400).send({
          message: "Invalid email/password.",
        });
      } else {
        res.status(200).send({
          User: `${user.email}`,
          accessToken: createAccessToken(user.toObject()),
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.send({ message: error.message });
  }
};

export { getUsers, createUser, loginUser };
