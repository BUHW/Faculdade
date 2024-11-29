const Alunos = require('../model/alunos');

exports.buscarAlunosPorId = async (req, res, next) => {

    try {
        const aluno = await Alunos.findOne({ where: { id: req.params.id } });
        
        if (!aluno) {
            return res.status(400).json({ message: 'Aluno não encontrado' });
        }

        return res.status(200).json({ conteudo: aluno });
    } catch (e) {
        res.status(500).json({ error: 'Erro ao encontrar aluno: ' + e.message})
    }
}