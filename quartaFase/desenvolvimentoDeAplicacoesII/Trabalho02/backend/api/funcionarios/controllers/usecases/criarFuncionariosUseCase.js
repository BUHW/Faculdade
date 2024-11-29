const db = require('../../../utils/database/database_postgres')

exports.criarFuncionarios = async (req, res, next) => {
    const { nome, email, tipo_funcionario } = req.body;

    try {
        const funcionarioExistente = await db.funcionarios.findOne({
            where: { email }
        });

        if (funcionarioExistente) {
            return res.status(400).json({ Mensagem: 'Já existe um funcionario com esse email.' });
        }

        const funcionario = await db.funcionarios.create({ nome, email, tipo_funcionario });

        return res.status(200).json({ conteudo: funcionario });
    } catch (e) {
        res.status(500).json({ error: 'Erro ao criar funcionário ' + e.message})
    }
}