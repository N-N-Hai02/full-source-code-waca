import express  from "express";
import products from "./data/Products.js";
import dotenv from "dotenv";
import connectDatabase from "./config/MogoDb.js";
import ImportData from "./DataImprot.js";
import productRouter from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import caterogyProductRouter from "./Routes/CategoryProduct.js";
import cors from "cors";
import contactRouter from "./Routes/ContactRoutes.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());
app.use(cors());

// API :
app.use("/api/import", ImportData);
app.use("/api/contacts", contactRouter);
app.use("/api/products", productRouter);
app.use("/api/cateProducts", caterogyProductRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
});

// error handler
app.use(notFound);
app.use(errorHandler);

// // load product from server
// app.get("/api/products",(req, res)=> {
//     res.json(products);
// });

// // single load product from server
// app.get("/api/products/:id",(req, res)=> {
//     const product = products.find((p) => p._id === req.params.id);
//     res.json(product);
// });


app.get("/",(req, res)=> {
    res.send("API is Running....");
});

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port: ${PORT}`)); 