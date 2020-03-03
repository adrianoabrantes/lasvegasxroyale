const User = require('../models/User');

module.exports = {
    async store(req, res) {
        const { usuario, email, senha, ativo } = req.body;
        let user = await User.findOne({ usuario, email, senha, ativo });

        if (!user) {
            user = await User.create({ usuario, email, senha, ativo });
        }

        return res.json(user);
    }
};
