require('dotenv').config();
const Usuarios = require('../model/usuarios');
const Permissoes = require('../model/permissoes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res, next) => {
    try {
        const { login, senha } = req.body;

        if (!login || !senha) {
            return res.status(400).json({ message: 'Login e senha são obrigatórios.' });
        }

        const user = await Usuarios.scope('senha').findOne({
            where: { login: login.toLowerCase(), cancelado: false }
        });

        if (!user) {
            return res.status(400).json({ message: 'Usuário ou senha inválido.' });
        }

        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) {
            return res.status(400).json({ message: 'Usuário ou senha inválido.' });
        }

        const permissoes = await Permissoes.findAll({
            attributes: ['grupo', 'nome', 'cancelado'],
            where: { id: user.id, cancelado: false }
        });

        const token = jwt.sign(
            { i_usuario: user.id, login: user.login },
            process.env.ACCESS_TOKEN,
            { expiresIn: '24h' }
        );

        return res.status(200).json({
            message: 'Autorizado',
            i_usuario: user.id,
            nome: user.nome,
            login: user.login,
            token,
            permissoes
        });
    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
