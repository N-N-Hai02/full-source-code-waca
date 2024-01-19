import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/ProductModel.js";
import { protect, admin } from "./../Middleware/AuthMiddleware.js";

const productRouter = express.Router();

// GET ALL PRODUCTS
productRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 6;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);
productRouter.get(
  "/allPrdClient",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);
//====================================

// == Admin == GET ALL PRODUCT WITHOUT SEARCH AND PEGINATION
productRouter.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ _id: -1 });
    res.json(products);
  })
);

//GET SINGLE PRODUCTS
productRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product in not found");
    }
  })
);
// PRODUCTS REVIEW
productRouter.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already Revieweb");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("Product in not found");
    }
  })
);

//DELETE PRODUCTS
productRouter.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "product deleted" });
    } else {
      res.status(404);
      throw new Error("Product in not found");
    }
  })
);
// CREATE PRODUCTS
productRouter.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, category, description, image, countInStock } =
      req.body;
    const productExist = await Product.findOne({ name });
    if (productExist) {
      res.status(400);
      throw new Error("Product name already exist");
    } else {
      const product = new Product({
        name,
        price,
        category,
        description,
        image,
        countInStock,
        user: req.user._id,
      });
      if (product) {
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
      } else {
        res.status(400);
        throw new Error("Invalid product data");
      }
    }
  })
);
// UPDATE PRODUCT
productRouter.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, price, category, description, image, countInStock } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.category = category || product.category;
      product.description = description || product.description;
      product.image = image || product.image;
      product.countInStock = countInStock || product.countInStock;

      const upodatedProduct = await product.save();
      res.json(upodatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found !");
    }
  })
);

export default productRouter;
