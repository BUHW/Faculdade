const db = require('../../../utils/database/database_postgres')

exports.criarAgendamentos = async (req, res, next) => {
    const { dataAgendamento, horaInicio, tipo_atendimento } = req.body;

    try {
        const agendamentoExistente = await db.agendamentos.findOne({
            where: { dataAgendamento, horaInicio }
        });

        if (agendamentoExistente) {
            return res.status(400).json({ Mensagem: 'Já existe agendamento para essa data e horário.' });
        }

        const agendamento = await db.agendamentos.create({ dataAgendamento, horaInicio, tipo_atendimento });

        return res.status(200).json({ conteudo: agendamento });
    } catch (e) {
        res.status(500).json({ error: 'Erro ao criar agendamento: ' + e.message})
    }
}