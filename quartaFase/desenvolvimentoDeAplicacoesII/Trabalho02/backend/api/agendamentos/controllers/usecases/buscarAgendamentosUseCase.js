const Agendamentos = require('../model/agendamentos');
exports.buscarAgendamentos = async (req, res, next) => {

    try {
        const agendamentos = await Agendamentos.findAll({
            where: {
                cancelado: false
            }
        });
    
        if (!agendamentos || agendamentos.length === 0) {
            return res.status(400).json({ message: 'Nenhum agendamento encontrado' });
        }
    
        return res.status(200).json({ conteudo: agendamentos });
    } catch (e) {
        res.status(500).json({ error: 'Erro ao encontrar agendamentos' + e.message})
    }
}