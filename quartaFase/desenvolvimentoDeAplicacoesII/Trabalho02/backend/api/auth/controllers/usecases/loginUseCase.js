require('dotenv').config();
const db = require('../../../utils/database/database_postgres')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res, next) => {

    const login = req.body.login.toLowerCase();
    const senha = req.body.senha;

    var user = '';
    if (login && senha) {
        user = await db.usuarios.scope('senha').findOne({ where: { login: login, cancelado: false } })
        try {
            if (!await bcrypt.compare(senha, user.senha)) {
                user = ''
            }
        } catch {
            user = '';
        }

    }
    if (!user) {
        res.status(400).send('Usuário ou senha inválido');
    } else {
        perm = await db.permissoes.findAll({ attributes: ['grupo', 'nome', 'cancelado'], where: { id: user.id } })
        const token = jwt.sign({
            i_usuario: user.id,
            login: user.login,
        },
            process.env.ACCESS_TOKEN,
            { expiresIn: "24h" }
        )
        res.status(200).send({
            message: 'Autorizado',
            i_usuario: user.id,
            nome: user.nome,
            login: user.login,
            token,
            perm
        });
    }
}

