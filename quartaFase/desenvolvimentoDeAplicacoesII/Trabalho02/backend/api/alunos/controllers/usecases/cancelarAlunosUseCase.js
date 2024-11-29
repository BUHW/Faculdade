const db = require('../../../utils/database/database_postgres');
const { Op } = require('sequelize');

exports.cancelarAlunos = async (req, res, next) => {
    try {
        const aluno = await db.alunos.update(
            { cancelado: true },
            { where: { id: req.params.id } }
        );

        if (aluno[0] > 0) {
            res.status(200).json({ Mensagem: 'Aluno cancelado com sucesso' });
        } else {
            res.status(400).json({ Mensagem: 'Nenhum aluno encontrado' });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ Mensagem: 'Erro ao cancelar aluno' });
    }
};
