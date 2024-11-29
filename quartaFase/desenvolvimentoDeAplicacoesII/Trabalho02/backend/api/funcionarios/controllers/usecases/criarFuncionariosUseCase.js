const Funcionarios = require('../model/funcionarios');

exports.criarFuncionarios = async (req, res, next) => {
    const { nome, email, tipo_funcionario } = req.body;

    try {
        const funcionarioExistente = await Funcionarios.findOne({
            where: { email }
        });

        if (funcionarioExistente) {
            return res.status(400).json({ Mensagem: 'Já existe um funcionario com esse email.' });
        }

        const funcionario = await Funcionarios.create({ nome, email, tipo_funcionario });

        return res.status(200).json({ conteudo: funcionario });
    } catch (e) {
        res.status(500).json({ error: 'Erro ao criar funcionário ' + e.message})
    }
}