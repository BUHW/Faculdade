const db = require('../../../utils/database/database_postgres')

exports.buscarUsuarios = async (req, res, next) => {

    try {
        const usuarios = await db.usuarios.findAll({
            where: {
                cancelado: false
            }
        });
    
        if (!usuarios || usuarios.length === 0) {
            return res.status(400).json({ message: 'Nenhum usuário encontrado' });
        }
    
        return res.status(200).json({ conteudo: usuarios });
    } catch (e) {
        res.status(500).json({ error: 'Usuarios não encontrados' + e.message})
    }
}