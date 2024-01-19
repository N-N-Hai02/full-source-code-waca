import express from "express";
import asyncHandler from "express-async-handler";
import CategoryProduct from "../models/CategoryProductModel.js";
import { protect, admin } from "./../Middleware/AuthMiddleware.js";

const caterogyProductRouter = express.Router();

// CREATE CATEGORY PRODUCTS
caterogyProductRouter.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const productCategoryExist = await CategoryProduct.findOne({ name });
    if (productCategoryExist) {
      res.status(400);
      throw new Error("Category Product name already exist");
    } else {
      const productCate = new CategoryProduct({
        name,
        description,
      });
      if (productCate) {
        const createdCategoryProduct = await productCate.save();
        res.status(201).json(createdCategoryProduct);
      } else {
        res.status(400);
        throw new Error("Invalid category product data");
      }
    }
  })
);
// GET ALL PRODUCTS Admin
caterogyProductRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const productCate = await CategoryProduct.find({});
    res.json(productCate);
  })
);
// GET ALL PRODUCTS Client
caterogyProductRouter.get(
  "/allClient",
  asyncHandler(async (req, res) => {
    const productCate = await CategoryProduct.find({}).sort({ _id: -1 });
    res.json(productCate);
  })
);
// GET Edit CATEGORY PRODUCTS
caterogyProductRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const productCate = await CategoryProduct.findById(req.params.id);
    if (productCate) {
      res.json(productCate);
    } else {
      res.status(404);
      throw new Error("Category Product in not found");
    }
  })
);
// UPDATE CATEGORY PRODUCT
caterogyProductRouter.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const productCate = await CategoryProduct.findById(req.params.id);
    if (productCate) {
      productCate.name = name || productCate.name;
      productCate.description = description || productCate.description;

      const upodatedCategoryProduct = await productCate.save();
      res.json(upodatedCategoryProduct);
    } else {
      res.status(404);
      throw new Error("Category Product not found !");
    }
  })
);
//DELETE CATEGORY PRODUCTS
caterogyProductRouter.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const productCate = await CategoryProduct.findById(req.params.id);
    if (productCate) {
      await productCate.remove();
      res.json({ message: "category Product deleted" });
    } else {
      res.status(404);
      throw new Error("category Product in not found");
    }
  })
);

export default caterogyProductRouter;
