const db = require('../../../utils/database/database_postgres')

exports.criarUsuario = async (req, res, next) => {
    const { login, email, senha } = req.body;

    try {
        const usuarioExistente = await db.usuarios.findOne({
            where: { login }
        });

        if (usuarioExistente) {
            return res.status(400).json({ Mensagem: 'Já existe um usuário com esse login.' });
        }

        const usuario = await db.usuarios.create({ login, email, senha });

        return res.status(200).json({ conteudo: usuario });
    } catch (e) {
        res.status(500).json({ error: 'Erro ao criar usuário: ' + e.message})
    }
}