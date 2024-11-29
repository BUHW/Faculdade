const db = require('../../../utils/database/database_postgres')

exports.buscarFuncionariosPorId = async (req, res, next) => {

    try {
        const funcionario = await db.funcionarios.findOne({ where: { id: req.params.id } });
        
        if (!funcionario) {
            return res.status(400).json({ message: 'Funcionário não encontrado' });
        }

        return res.status(200).json({ conteudo: funcionario });
    } catch (e) {
        res.status(500).json({ error: 'Erro ao enocntrar funcionário: ' + e.message})
    }
}