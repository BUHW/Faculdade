const { Users } = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secretKey';

exports.login = async (req, res, next) => {
    try {
        const { email, pass } = req.body;

        if (!email || !pass) {
            return res.status(400).send({ message: 'Email e senha são obrigatórios.' });
        }

        const user = await Users.findOne({ email });
        if (!user) {
            console.warn(`Tentativa de login com email não encontrado: ${email}`);
            return res.status(401).send({ message: 'Credenciais inválidas.' });
        }

        const isMatch = await bcrypt.compare(pass, user.pwd);
        if (!isMatch) {
            return res.status(401).send({ message: 'Credenciais inválidas.' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        return res.status(200).send({ 
            message: 'Usuário logado com sucesso.',
            nome: user.name,
            token 
        });

    } catch (error) {
        console.error('Erro ao processar login:', error.message);

        return res.status(500).send({ message: 'Erro ao processar login. Tente novamente mais tarde.' });
    }
};

exports.create = async (req, res, next) => {
    try {

        const encryptedPass = bcrypt.hashSync(req.body.pwd, 10);

        const user = new Users({
            name: req.body.name,
            user: req.body.user,
            email: req.body.email,
            pwd: encryptedPass,
            level: req.body.level,
            status: req.body.status
        });

        const resp = await Users.create(user);

        if (!resp) {
            res.status(500).send({ message: 'Erro ao criar usuário' });
        } else {
            res.status(200).send({ message: 'Usuário criado com sucesso', user: resp });
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
            res.status(200).send({ message: 'Usuário encontrado com sucesso', user: user });
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
            name: req.body.name,
            user: req.body.user,
            email: req.body.email,
            pwd: req.body.pwd,
            level: req.body.level,
            status: req.body.status
        }

        const resp = await Users.findByIdAndUpdate(id, user);

        if (!resp) {
            res.status(500).send({ message: 'Erro ao atualizar usuário' });
        } else {
            res.status(200).send({ message: 'Usuário atualizado com sucesso', user: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do PUT: ', error);
        res.status(500).send('Erro ao processar dados do PUT');
    }
}

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;

        const resp = await Users.findByIdAndUpdate(id, { status: false }, { new: true });

        if (!resp) {
            res.status(500).send({ message: 'Erro ao atualizar status do usuário' });
        } else {
            res.status(200).send({ message: 'Status do usuário atualizado com sucesso', user: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do DELETE: ', error);
        res.status(500).send('Erro ao processar dados do DELETE');
    }
};