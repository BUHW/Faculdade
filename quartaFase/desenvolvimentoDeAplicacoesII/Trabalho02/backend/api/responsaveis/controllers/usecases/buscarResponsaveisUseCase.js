const Responsaveis = require('../model/responsaveis');

exports.buscarResponsaveis = async (req, res, next) => {

    try {
        const responsaveis = await Responsaveis.findAll({
            where: {
                cancelado: false
            }
        });
    
        if (!responsaveis || responsaveis.length === 0) {
            return res.status(400).json({ message: 'Nenhum responsável encontrado' });
        }
    
        return res.status(200).json({ conteudo: responsaveis });
    } catch (e) {
        res.status(500).json({ error: 'Erro ao encontrar responsáveis' + e.message})
    }
}