const db = require('../../../utils/database/database_postgres');

exports.editarSetores = async (req, res, next) => {
    try {
        const setorAtualizado = await db.setores.update(req.body, { where: { id: req.params.id } });
        
        if (setorAtualizado[0] > 0) {
            res.status(200).json({ Mensagem: 'Setor atualizado' });
        } else {
            res.status(400).json({ Mensagem: 'Nenhum setor encontrado' });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ Mensagem: 'Erro ao atualizar setor' });
    }
};
