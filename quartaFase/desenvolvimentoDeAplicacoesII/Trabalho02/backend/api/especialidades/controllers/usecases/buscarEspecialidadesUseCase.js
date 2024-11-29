const db = require('../../../utils/database/database_postgres')

exports.buscarEspecialidades = async (req, res, next) => {

    try {
        const especialidades = await db.especialidades.findAll({
            where: {
                cancelado: false
            }
        });
    
        if (!especialidades || especialidades.length === 0) {
            return res.status(400).json({ message: 'Nenhuma especialidade encontrada' });
        }
    
        return res.status(200).json({ conteudo: especialidades });
    } catch (e) {
        res.status(500).json({ error: 'Erro ao encontrar especialidades' + e.message})
    }
}