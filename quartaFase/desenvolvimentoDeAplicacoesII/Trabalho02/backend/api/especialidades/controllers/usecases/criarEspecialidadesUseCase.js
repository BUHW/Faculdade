const Especialidades = require('../model/especialidades');

exports.criarEspecialidades = async (req, res, next) => {
    const { nomeEspecialidade } = req.body;

    try {
        const especialidadeExistente = await Especialidades.findOne({
            where: { nomeEspecialidade }
        });

        if (especialidadeExistente) {
            return res.status(400).json({ Mensagem: 'Já existe uma especialidade com esse nome.' });
        }

        const especialidade = await Especialidades.create({ nomeEspecialidade });

        return res.status(200).json({ conteudo: especialidade });
    } catch (e) {
        res.status(500).json({ error: 'Erro ao criar especialidade: ' + e.message})
    }
}