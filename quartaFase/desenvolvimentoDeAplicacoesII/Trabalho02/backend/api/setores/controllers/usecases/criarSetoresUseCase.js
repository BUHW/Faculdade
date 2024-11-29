const db = require('../../../utils/database/database_postgres')

exports.criarSetores = async (req, res, next) => {
    const { nome, descricao } = req.body;

    try {
        const setorExistente = await db.setores.findOne({
            where: { nome }
        });

        if (setorExistente) {
            return res.status(400).json({ Mensagem: 'Já existe um setor com esse nome.' });
        }

        const setor = await db.setores.create({ nome, descricao });

        return res.status(200).json({ conteudo: setor });
    } catch (e) {
        res.status(500).json({ error: 'Erro ao criar setor: ' + e.message})
    }
}