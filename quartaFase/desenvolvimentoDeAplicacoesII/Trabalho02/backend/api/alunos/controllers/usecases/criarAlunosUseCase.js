const db = require('../../../utils/database/database_postgres')

exports.criarAlunos = async (req, res, next) => {
    const { nome, matricula, diagnostico } = req.body;

    try {
        const alunoExistente = await db.alunos.findOne({
            where: { matricula }
        });

        if (alunoExistente) {
            return res.status(400).json({ Mensagem: 'Já existe um aluno com essa matrícula.' });
        }

        const aluno = await db.alunos.create({ nome, matricula, diagnostico });

        return res.status(200).json({ conteudo: aluno });
    } catch (e) {
        res.status(500).json({ error: 'Erro ao criar aluno: ' + e.message})
    }
}