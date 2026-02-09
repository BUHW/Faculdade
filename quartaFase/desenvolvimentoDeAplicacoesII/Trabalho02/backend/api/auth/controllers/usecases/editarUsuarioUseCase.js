const Usuarios = require('../model/usuarios');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');


exports.editarUsuario = async (req, res, next) => {
    try {
        usuario = null
        if (req.body.login) {
            const usuario = await Usuarios.findOne({
                where: {
                    login: req.body.login,
                    id: {
                        [Op.ne]: req.params.id
                    }
                }
            });
        }
        if (!usuario) {
            if (req.body.senha) {
                req.body.senha = await bcrypt.hash(req.body.senha, 10);
            }
            const novoUsuario = await Usuarios.update(req.body, { where: { id: req.params.id } });
            if (novoUsuario) {
                res.status(200).json({ Mensagem: 'Usuário Atualizado' });
            } else {
                res.status(400).json({ Mensagem: 'Nenhum usuário encontrado' });
            }

        } else {
            res.status(403).json({ Mensagem: 'Login já existe na base de dados' });
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ Mensagem: 'Erro interno do servidor' });
    }
}
