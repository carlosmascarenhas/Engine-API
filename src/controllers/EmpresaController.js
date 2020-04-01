const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {

    async index(req, res) {
        const empresa = await connection('empresa').select('*');


        return res.json(empresa);
    },

    async create(req, res) {
        try {
            const { nome_empresa, email, senha, confirmar_senha } = req.body;

            const id = crypto.randomBytes(4).toString('HEX');

            if (senha != confirmar_senha) {
                return res.send({ message: 'senhas não conferem' });
            }

            await connection('empresa').insert({
                id,
                nome_empresa,
                email,
                senha,
            });
            return res.status(200).send({ message: "cadastrado", id })
        } catch (error) {
            return res.status(400).send({ error: 'alguma coisa errada' });
        }
    }
}