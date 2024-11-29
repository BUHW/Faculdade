const db = require('../../../utils/database/database_postgres')

exports.criarResponsaveis = async (req, res, next) => {
    const { nome, contato, endereco } = req.body;

    try {
        const responsavelExistente = await db.responsaveis.findOne({
            where: { contato }
        });

        if (responsavelExistente) {
            return res.status(400).json({ Mensagem: 'Já existe um responsável com esse contato.' });
        }

        const responsavel = await db.responsaveis.create({ nome, contato, endereco });

        return res.status(200).json({ conteudo: responsavel });
    } catch (e) {
        res.status(500).json({ error: 'Erro ao criar responsável: ' + e.message})
    }
}