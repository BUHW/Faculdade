const Funcionarios = require('../model/funcionarios');
const { Op } = require('sequelize');

exports.cancelarFuncionarios = async (req, res, next) => {
    try {
        const funcionario = await Funcionarios.update(
            { cancelado: true },
            { where: { id: req.params.id } }
        );

        if (funcionario[0] > 0) {
            res.status(200).json({ Mensagem: 'Funcionário cancelado com sucesso' });
        } else {
            res.status(400).json({ Mensagem: 'Nenhum funcionário encontrado' });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ Mensagem: 'Erro ao cancelar funcionário' });
    }
};
