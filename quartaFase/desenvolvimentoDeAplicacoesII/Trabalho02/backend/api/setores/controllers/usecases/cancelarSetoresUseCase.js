const db = require('../../../utils/database/database_postgres');
const { Op } = require('sequelize');

exports.cancelarSetores = async (req, res, next) => {
    try {
        const setor = await db.setores.update(
            { cancelado: true },
            { where: { id: req.params.id } }
        );

        if (setor[0] > 0) {
            res.status(200).json({ Mensagem: 'Setor cancelado com sucesso' });
        } else {
            res.status(400).json({ Mensagem: 'Nenhum setor encontrado' });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ Mensagem: 'Erro ao cancelar setor' });
    }
};
