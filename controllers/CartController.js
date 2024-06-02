const { Cart } = require("../models");

class CartController {
    static async getCart(req, res, next) {
        try {
            const cart = await Cart.findAll(
                {
                    include: ["User", "Product"]
                }
            );
            res.status(200).json(cart);
        }
        catch (err) {
            console.log(err);
        }
    }
    static async addCart(req, res, next) {
        try {
            const {UserId, ProductId, quantity } = req.body;
            const cart = await Cart.create({
                UserId,
                ProductId,
                quantity
            });
            res.status(201).json(cart);
        }
        catch (err) {
            console.log(err);
        }
    }

    static async deleteCart(req, res, next) {
        try {
            const cart = await Cart.findByPk(req.params.id);
            if (!cart) {
                throw { name: "NotFound" };
            }
            await cart.destroy();
            res.status(200).json({ message: "Cart deleted" });
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = {
    CartController
};
