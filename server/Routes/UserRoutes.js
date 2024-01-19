import express from "express";
import asyncHandler from "express-async-handler";
import {protect, admin } from "../Middleware/AuthMiddleware.js";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";

const userRouter = express.Router();

// login
userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        // password: user.password,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or password");
    }
  })
);

// register
userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

// profile
userRouter.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        // password: user.password,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("User not found");
    }
  })
);
// update profile
userRouter.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(401);
      throw new Error("User not found");
    }
  })
);

//================================================= Admin ========================

// GET ALL USER ADMIN
userRouter.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
      const users = await User.find({});
      res.json(users);
  })
);

// Create User Admin
userRouter.post(
  "/CreateAdmin",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await User.create({
      name,
      email,
      password,
      isAdmin
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

// GET Edit  User in Admin
userRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const users = await User.findById(req.params.id);
    if (users) {
      res.json(users);
    } else {
      res.status(404);
      throw new Error("Users in not found");
    }
  })
);
// UPDATE USER
userRouter.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, email, isAdmin, password } = req.body;
    const userUpdate = await User.findById(req.params.id);
    if (userUpdate) {
      userUpdate.name = name || userUpdate.name;
      userUpdate.email = email || userUpdate.email;
      userUpdate.isAdmin = isAdmin || userUpdate.isAdmin;
      userUpdate.password = password || userUpdate.password;
      // if (req.body.password) {
      //   userUpdate.password = req.body.password;
      // }

      const updatedUser = await userUpdate.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        password: updatedUser.password,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User Update not found !");
    }
  })
);
//DELETE USERS
userRouter.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const userDelete = await User.findById(req.params.id);
    if (userDelete) {
      await userDelete.remove();
      res.json({ message: "Users deleted success" });
    } else {
      res.status(404);
      throw new Error("Users in not found");
    }
  })
);

export default userRouter;
