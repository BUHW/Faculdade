const { Students } = require('../models/students');

exports.create = async (req, res, next) => {
    try {

        const student = new Students({
            name: req.body.name,
            age: req.body.age,
            parents: req.body.parents,
            phone_number: req.body.phone_number,
            special_needs: req.body.special_needs,
            status: req.body.status
        });

        const resp = await Students.create(student);

        if (!resp) {
            res.status(500).send({ message: 'Erro ao criar estudante' });
        } else {
            res.status(200).send({ message: 'Estudante criado com sucesso', student: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do POST: ', error);
        res.status(500).send('Erro ao processar dados do POST');
    }
};

exports.getAll = async (req, res, next) => {
    try {
        
        const resp = await Students.find().sort({ createdAt: -1 });

        if (!resp) {
            res.status(500).send({ message: 'Erro ao buscar estudantes' });
        } else {
            res.status(200).send({ message: 'Estudantes encontrados com sucesso', students: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do GET: ', error);
        res.status(500).send('Erro ao processar dados do GET');
    }
};

exports.getById = async (req, res, next) => {
    try {
        
        const id = req.params.id;
        const student = await Students.findById(id);

        if (!student) {
            res.status(500).send({ message: 'Erro ao buscar estudante por id' });
        } else {
            res.status(200).send({ message: 'Estudante encontrado com sucesso', student: student });
        }

    } catch (error) {
        console.log('Erro ao processar dados do GET por id de estudante: ', error);
        res.status(500).send('Erro ao processar dados do GET por id de estudante');
    }
};

exports.update = async (req, res, next) => {
    try {
        
        const id = req.params.id;
        const student = {
            name: req.body.name,
            age: req.body.age,
            parents: req.body.parents,
            phone_number: req.body.phone_number,
            special_needs: req.body.special_needs,
            status: req.body.status
        }

        const resp = await Students.findByIdAndUpdate(id, student, { new: true });

        if (!resp) {
            res.status(500).send({ message: 'Erro ao atualizar estudante' });
        } else {
            res.status(200).send({ message: 'Estudante atualizado com sucesso', student: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do PUT: ', error);
        res.status(500).send('Erro ao processar dados do PUT');
    }
}

exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { status } = req.body;

        const updatedStudent = await Students.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedStudent) {
            return res.status(404).send({ message: 'Aluno não encontrado' });
        }

        res.status(200).send({ message: 'Status atualizado com sucesso', student: updatedStudent });
    } catch (error) {
        console.error('Erro ao atualizar status do aluno: ', error);
        res.status(500).send({ message: 'Erro ao atualizar status do aluno' });
    }
};
