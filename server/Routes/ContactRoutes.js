import express from "express";
import asyncHandler from "express-async-handler";
import {protect, admin } from "../Middleware/AuthMiddleware.js";
import Contact from "../models/ContactModel.js";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";

const contactRouter = express.Router();

// Add contact client
contactRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, phone, email, content} = req.body;
    const contact = await Contact.create({
        name, phone, email, content
    });
    if (contact) {
      res.status(201).json({
        _id: contact._id,
        name: contact.name,
        email: contact.email,
        content: contact.content,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Contact Data");
    }
  })
);



//================================================= Admin ========================

// GET ALL USER ADMIN
contactRouter.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
      const contacts = await Contact.find({});
      res.json(contacts);
  })
);

//DELETE USERS
contactRouter.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const contactDelete = await Contact.findById(req.params.id);
    if (contactDelete) {
      await contactDelete.remove();
      res.json({ message: "Contacts deleted success" });
    } else {
      res.status(404);
      throw new Error("Contacts in not found");
    }
  })
);

export default contactRouter;
