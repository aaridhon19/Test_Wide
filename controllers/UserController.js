const { User } = require("../models"); 
const { comparePassword } = require("../helpers/bcrypt");

class UserController {
    static async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({
                where: { username }
            });
            if (!user) {
                throw { name: "InvalidLogin" };
            }
            const isValidPassword = comparePassword(password, user.password);
            if (!isValidPassword) {
                throw { name: "InvalidLogin" };
            }
            // Kirim data pengguna ke klien setelah login berhasil
            res.status(200).json({
                message: "Login success",
                user: {
                    id: user.id,
                    username: user.username,
                    address: user.address,
                    // tambahkan data lain yang perlu Anda kirim ke klien di sini
                }
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Login failed" });
        }
    }

    static async getUserById(req, res, next) {
        try {
            const user = await User.findByPk(req.params.id);
            res.status(200).json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Failed to get user" });
        }
    }
}

module.exports = {
    UserController
};
