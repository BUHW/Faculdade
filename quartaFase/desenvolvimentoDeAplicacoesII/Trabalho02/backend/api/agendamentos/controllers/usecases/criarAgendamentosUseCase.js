const Agendamentos = require('../model/agendamentos');

exports.criarAgendamentos = async (req, res, next) => {
    const { dataAgendamento, horaInicio, tipo_atendimento } = req.body;

    try {
        const agendamentoExistente = await Agendamentos.findOne({
            where: { dataAgendamento, horaInicio }
        });

        if (agendamentoExistente) {
            return res.status(400).json({ Mensagem: 'Já existe agendamento para essa data e horário.' });
        }

        const agendamento = await Agendamentos.create({ dataAgendamento, horaInicio, tipo_atendimento });

        return res.status(200).json({ conteudo: agendamento });
    } catch (e) {
        res.status(500).json({ error: 'Erro ao criar agendamento: ' + e.message})
    }
}