const { Users } = require('../models/users');
const bcrypt = require('bcryptjs');

exports.login = async (req, res, next) => {
    try {
        const { email, pass } = req.body;

        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(401).send({ message: 'Usuário não encontrado' });
        }

        const isMatch = bcrypt.compareSync(pass, user.pass);

        if (!isMatch) {
            return res.status(401).send({ message: 'Senha incorreta' });
        }

    } catch (error) {
        console.log('Erro ao processar login: ', error);
        res.status(500).send('Erro ao processar login');
    }
};

exports.create = async (req, res, next) => {
    try {

        const encryptedPass = bcrypt.hashSync(req.body.pass, 10);

        const user = new Users({
            nome: req.body.nome,
            email: req.body.email,
            pass: encryptedPass
        });

        const resp = await Users.create(user);

        if (!resp) {
            res.status(500).send({ message: 'Erro ao criar usuário' });
        } else {
            res.status(200).send({ message: 'Usuário criado com sucesso', user: { nome: resp.nome, email: resp.email } });
        }

    } catch (error) {
        console.log('Erro ao processar dados do POST: ', error);
        res.status(500).send('Erro ao processar dados do POST');
    }
};

exports.getAll = async (req, res, next) => {
    try {
        
        const resp = await Users.find();

        if (!resp) {
            res.status(500).send({ message: 'Erro ao buscar usuários' });
        } else {
            res.status(200).send({ message: 'Usuários encontrados com sucesso', users: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do GET: ', error);
        res.status(500).send('Erro ao processar dados do GET');
    }
};

exports.getById = async (req, res, next) => {
    try {
        
        const id = req.params.id;
        const user = await Users.findById(id);

        if (!user) {
            res.status(500).send({ message: 'Erro ao buscar usuário por id' });
        } else {
            res.status(200).send({ message: 'Usuário encontrado com sucesso', user: { nome: user.nome, email: user.email } });
        }

    } catch (error) {
        console.log('Erro ao processar dados do GET por id de usuário: ', error);
        res.status(500).send('Erro ao processar dados do GET por id de usuário');
    }
};

exports.update = async (req, res, next) => {
    try {
        
        const id = req.params.id;
        const user = {
            nome: req.body.nome,
            email: req.body.email,
            pass: req.body.pass
        }

        const resp = await Users.findByIdAndUpdate(id, user);

        if (!resp) {
            res.status(500).send({ message: 'Erro ao atualizar usuário' });
        } else {
            res.status(200).send({ message: 'Usuário atualizado com sucesso', user: { nome: resp.nome, email: resp.email } });
        }

    } catch (error) {
        console.log('Erro ao processar dados do PUT: ', error);
        res.status(500).send('Erro ao processar dados do PUT');
    }
}

exports.delete = async (req, res, next) => {
    try {
        
        const id = req.params.id;

        const resp = await Users.findByIdAndDelete(id);

        if (!resp) {
            res.status(500).send({ message: 'Erro ao deletar usuário' });
        } else {
            res.status(200).send({ message: 'Usuário deletado com sucesso', user: { nome: resp.nome, email: resp.email } });
        }

    } catch (error) {
        console.log('Erro ao processar dados do DELETE: ', error);
        res.status(500).send('Erro ao processar dados do DELETE');
    }
};