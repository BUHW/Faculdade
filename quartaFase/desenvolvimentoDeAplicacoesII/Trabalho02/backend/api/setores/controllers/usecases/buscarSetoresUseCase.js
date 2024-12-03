const Setores = require('../model/setores');

exports.buscarSetores = async (req, res, next) => {

    try {
        const setores = await Setores.findAll({
            where: {
                cancelado: false
            }
        });
    
        if (!setores || setores.length === 0) {
            return res.status(400).json({ message: 'Nenhum setor encontrado' });
        }
    
        return res.status(200).json({ conteudo: setores });
    } catch (e) {
        res.status(500).json({ error: 'Erro ao encontrar setores' + e.message})
    }
}