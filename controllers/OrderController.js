const { Order, Cart, Product, User } = require('../models');

class OrderController {
    static async getOrder(req, res, next) {
        try {
            const order = await Order.findAll({
                include: [
                    {
                        model: Cart,
                        include: [
                            {
                                model: Product
                            },
                            {
                                model: User
                            }
                        ]
                    }
                ]
            });
            res.status(200).json(order);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async addOrder(req, res, next) {
        try {
            const { CartId } = req.body; // Ambil CartId dari body permintaan
            const order = await Order.create({ CartId }); // Buat order baru dengan CartId yang diambil
            res.status(201).json(order);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
}

module.exports = {
    OrderController
};
