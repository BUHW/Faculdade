const { Teacher } = require('../models/teacher');

exports.create = async (req, res, next) => {
    try {

        const teacher = new Teacher({
            name: req.body.name,
            school_disciplines: req.body.school_disciplines,
            contact: req.body.contact,
            phone_number: req.body.phone_number,
            status: req.body.status
        });

        const resp = await Teacher.create(teacher);

        if (!resp) {
            res.status(500).send({ message: 'Erro ao criar professor' });
        } else {
            res.status(200).send({ message: 'Professor criado com sucesso', teacher: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do POST: ', error);
        res.status(500).send('Erro ao processar dados do POST');
    }
};

exports.getAll = async (req, res, next) => {
    try {
        
        const resp = await Teacher.find();

        if (!resp) {
            res.status(500).send({ message: 'Erro ao buscar professores' });
        } else {
            res.status(200).send({ message: 'Professores encontrados com sucesso', teachers: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do GET: ', error);
        res.status(500).send('Erro ao processar dados do GET');
    }
};

exports.getById = async (req, res, next) => {
    try {
        
        const id = req.params.id;
        const teacher = await Teacher.findById(id);

        if (!teacher) {
            res.status(500).send({ message: 'Erro ao buscar professor por id' });
        } else {
            res.status(200).send({ message: 'Professor encontrado com sucesso', teacher: teacher });
        }

    } catch (error) {
        console.log('Erro ao processar dados do GET por id de professor: ', error);
        res.status(500).send('Erro ao processar dados do GET por id de professor');
    }
};

exports.update = async (req, res, next) => {
    try {
        
        const id = req.params.id;
        const teacher = {
            name: req.body.name,
            school_disciplines: req.body.school_disciplines,
            contact: req.body.contact,
            phone_number: req.body.phone_number,
            status: req.body.status
        }

        const resp = await Teacher.findByIdAndUpdate(id, teacher, { new: true });

        if (!resp) {
            res.status(500).send({ message: 'Erro ao atualizar professor' });
        } else {
            res.status(200).send({ message: 'Professor atualizado com sucesso', teacher: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do PUT: ', error);
        res.status(500).send('Erro ao processar dados do PUT');
    }
}

exports.delete = async (req, res, next) => {
    try {
        
        const id = req.params.id;

        const resp = await Teacher.findByIdAndDelete(id);

        if (!resp) {
            res.status(500).send({ message: 'Erro ao deletar professor' });
        } else {
            res.status(200).send({ message: 'Professor deletado com sucesso', teacher: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do DELETE: ', error);
        res.status(500).send('Erro ao processar dados do DELETE');
    }
};
