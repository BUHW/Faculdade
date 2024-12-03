const Responsaveis = require('../model/responsaveis');
const { Op } = require('sequelize');

exports.cancelarResponsaveis = async (req, res, next) => {
    try {
        const responsavel = await Responsaveis.update(
            { cancelado: true },
            { where: { id: req.params.id } }
        );

        if (responsavel[0] > 0) {
            res.status(200).json({ Mensagem: 'Responsável cancelado com sucesso' });
        } else {
            res.status(400).json({ Mensagem: 'Nenhum responsável encontrado' });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ Mensagem: 'Erro ao cancelar responsável' });
    }
};
