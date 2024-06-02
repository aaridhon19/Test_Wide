const express = require("express");
const router = express.Router();

const {UserController} = require("../controllers/UserController");
const {ProductController} = require("../controllers/ProductController");
const {CartController} = require("../controllers/CartController");
const {OrderController} = require("../controllers/OrderController");

//login
router.post("/login", UserController.login);

//user
router.get("/user/:id", UserController.getUserById);

//product
router.get("/product", ProductController.getProducts);
router.get("/product/:id", ProductController.getProductById);
router.post("/product", ProductController.addProduct);
router.put("/product/:id", ProductController.updateProduct);
router.delete("/product/:id", ProductController.deleteProduct);

//cart  
router.get("/cart", CartController.getCart);
router.post("/cart", CartController.addCart);
router.delete("/cart/:id", CartController.deleteCart);

//order
router.get("/order", OrderController.getOrder);
router.post("/order", OrderController.addOrder);

module.exports = router;

