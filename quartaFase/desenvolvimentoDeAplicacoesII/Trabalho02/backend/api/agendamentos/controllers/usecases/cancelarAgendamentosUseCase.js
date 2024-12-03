const Agendamentos = require('../model/agendamentos');
const { Op } = require('sequelize');

exports.cancelarAgendamentos = async (req, res, next) => {
    try {
        const agendamento = await Agendamentos.update(
            { cancelado: true },
            { where: { id: req.params.id } }
        );

        if (agendamento[0] > 0) {
            res.status(200).json({ Mensagem: 'Agendamento cancelado com sucesso' });
        } else {
            res.status(400).json({ Mensagem: 'Nenhum agendamento encontrado' });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ Mensagem: 'Erro ao cancelar agendamento' });
    }
};
