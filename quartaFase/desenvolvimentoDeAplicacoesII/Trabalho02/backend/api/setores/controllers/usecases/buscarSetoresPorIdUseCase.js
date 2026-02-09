const Setores = require('../model/setores');

exports.buscarSetoresPorId = async (req, res, next) => {

    try {
        const setor = await Setores.findOne({ where: { id: req.params.id } });
        
        if (!setor) {
            return res.status(400).json({ message: 'Setor não encontrado' });
        }

        return res.status(200).json({ conteudo: setor });
    } catch (e) {
        res.status(500).json({ error: 'Erro ao encontrar setor: ' + e.message})
    }
}