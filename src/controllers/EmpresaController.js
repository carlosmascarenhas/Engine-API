
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const connection = require('../database/connection');

module.exports = {

    async todas(req, res) {
        const empresa = await connection('empresas')
            .select('*');

        return res.json({ empresa });
    },

    async index(req, res) {
        const id = req.headers.authorization;

        if (id) {
            const empresa = await connection('empresas')
                .where('id', id)
                .select('*')
                .first();

            console.log(empresa)
            return res.json(empresa);
        } else {
            return res.json({ message: 'sem id' });
        }
        //ok
        //test
    },

    async create(req, res) {
        try {

            const { nome, senha, confirmar_senha, nome_empresa,
                email, telefone, cpf, cnpj, rg, orgao_emissor,
                cidade, latitude, longitude, bairro, cep, numero, rua, complemento,estado } = req.body;

            const id = crypto.randomBytes(4).toString('HEX');

            const saltRounds = 10
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(senha, salt);

            if (senha != confirmar_senha) {
                console.log('senhas nao conferem');
                return res.send({ message: 'senhas não conferem' });
            } else
                if (senha.length < 8) {
                    console.log('senha muito curta');
                    return res.send({ message: 'senhas muito curta' });
                }

            const empresa = await connection('empresas')
                .where('cnpj', cnpj)
                .select('*')
                .first() || await connection('empresas')
                    .where('email', email)
                    .select('*')
                    .first();

            if (!empresa) {

                await connection('empresas').insert({
                    id,
                    nome_dono: nome,
                    nome_empresa,
                    email,
                    telefone,
                    cpf,
                    cnpj,
                    rg,
                    orgao_emissor,
                    cidade,
                    latitude,
                    longitude,
                    bairro,
                    cep,
                    numero,
                    rua,
                    complemento,
                    latitude,
                    longitude,
                    senha: hash,
                    estado,
                });
// ok
                console.log(nome_empresa);
                return res.send({ message: "cadastrado", id });
            } else {
                console.log('empresa ja cadastrada');
                return res.send({ message: "Empresa ja cadastrada" });
            }
        } catch (error) {
            console.log(error);
            return res.status(400).send({ error: 'alguma coisa errada' });
        }
    },

    async header(req, res) {
        const id_empresa = req.headers.authorization;

        const empresa = await connection('empresas')
            .where('id', id_empresa)
            .select('nome_empresa')
            .first();
        const url = await connection('imagemlogo')
            .where('id_empresa', id_empresa)
            .select('url')
            .first();
        console.log({ empresa, url });

        return res.json({ empresa, url });

    },

    async get_user(req, res) {
        const { id } = req.body;

        const empresa = await connection('empresas')
            .where('id', id)
            .select('*')
            .first();

        if (empresa) {
            return res.json(empresa);
        } else {
            return res.status(404).send({ error: 'not found' });
        }
    }
}