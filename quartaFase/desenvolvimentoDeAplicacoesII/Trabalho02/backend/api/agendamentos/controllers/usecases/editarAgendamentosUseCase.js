const db = require('../../../utils/database/database_postgres');

exports.editarAgendamentos = async (req, res, next) => {
    try {
        const agendamentoAtualizado = await db.agendamentos.update(req.body, { where: { id: req.params.id } });
        
        if (agendamentoAtualizado[0] > 0) {
            res.status(200).json({ Mensagem: 'Agendamento atualizado' });
        } else {
            res.status(400).json({ Mensagem: 'Nenhum agendamento encontrado' });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ Mensagem: 'Erro ao atualizar agendamento' });
    }
};
