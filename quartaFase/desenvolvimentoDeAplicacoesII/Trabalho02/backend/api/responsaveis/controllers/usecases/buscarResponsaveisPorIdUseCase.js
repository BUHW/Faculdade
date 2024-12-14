const Responsaveis = require('../model/responsaveis');

exports.buscarResponsaveisPorId = async (req, res, next) => {

    try {
        const responsavel = await Responsaveis.findOne({ where: { id: req.params.id } });
        
        if (!responsavel) {
            return res.status(400).json({ message: 'Responsável não encontrado' });
        }

        return res.status(200).json({ conteudo: responsavel });
    } catch (e) {
        res.status(500).json({ error: 'Erro ao encontrar responsável: ' + e.message})
    }
}