const db = require('../../../utils/database/database_postgres')

exports.buscarAlunos = async (req, res, next) => {

    try {
        const alunos = await db.alunos.findAll({
            where: {
                cancelado: false
            }
        });
    
        if (!alunos || alunos.length === 0) {
            return res.status(400).json({ message: 'Nenhum aluno encontrado' });
        }
    
        return res.status(200).json({ conteudo: alunos });
    } catch (e) {
        res.status(500).json({ error: 'Erro ao encontrar alunos' + e.message})
    }
}