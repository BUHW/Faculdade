const db = require('../../../utils/database/database_postgres')

exports.buscarAgendamentosPorId = async (req, res, next) => {

    try {
        const agendamento = await db.agendamentos.findOne({ where: { id: req.params.id } });
        
        if (!agendamento) {
            return res.status(400).json({ message: 'Agendamento não encontrado' });
        }

        return res.status(200).json({ conteudo: agendamento });
    } catch (e) {
        res.status(500).json({ error: 'Erro ao encontrar agendamento: ' + e.message})
    }
}