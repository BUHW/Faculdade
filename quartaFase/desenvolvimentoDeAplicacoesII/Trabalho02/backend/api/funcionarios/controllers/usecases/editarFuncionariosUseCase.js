const db = require('../../../utils/database/database_postgres');
const { Op } = require('sequelize');

exports.editarFuncionarios = async (req, res, next) => {
    try {
        const funcionarioAtualizado = await db.funcionarios.update(req.body, { where: { id: req.params.id } });
        
        if (funcionarioAtualizado[0] > 0) {
            res.status(200).json({ Mensagem: 'Funcionário atualizado' });
        } else {
            res.status(400).json({ Mensagem: 'Nenhum funcionário encontrado' });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ Mensagem: 'Erro ao atualizar funcionário' });
    }
};
