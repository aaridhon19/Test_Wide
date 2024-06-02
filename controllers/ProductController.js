const { Product } = require('../models');

class ProductController {
    static async addProduct(req, res, next) {
        try {
            const { name, type, price, stock } = req.body;
            const newProduct = await Product.create({ name, type, price, stock });
            res.status(201).json(newProduct);
        }
        catch (err) {
            console.log(err);
        }
    }

    static async getProducts(req, res, next) {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        }
        catch (err) {
            console.log(err);
        }
    }

    static async getProductById(req, res, next) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                throw { name: "NotFound" };
            }
            res.status(200).json(product);
        }
        catch (err) {
            console.log(err);
        }
    }

    static async updateProduct(req, res, next) {
        try {
            const { name, type, price, stock } = req.body;
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                throw { name: "NotFound" };
            }
            product.name = name;
            product.type = type;
            product.price = price;
            product.stock = stock;
            await product.save();
            res.status(200).json(product);
        }
        catch (err) {
            console.log(err);
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (!product) {
                throw { name: "NotFound" };
            }
            await product.destroy();
            res.status(200).json({ message: "Product has been deleted" });
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = {
    ProductController
};
