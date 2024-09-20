const { Professionals } = require('../models/professionals');

exports.create = async (req, res, next) => {
    try {

        const professional = new Professionals({
            name: req.body.name,
            specialty: req.body.specialty,
            contact: req.body.contact,
            phone_number: req.body.phone_number,
            status: req.body.status
        });

        const resp = await Professionals.create(professional);

        if (!resp) {
            res.status(500).send({ message: 'Erro ao criar profissional' });
        } else {
            res.status(200).send({ message: 'Profissional criado com sucesso', professional: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do POST: ', error);
        res.status(500).send('Erro ao processar dados do POST');
    }
};

exports.getAll = async (req, res, next) => {
    try {
        
        const resp = await Professionals.find();

        if (!resp) {
            res.status(500).send({ message: 'Erro ao buscar profissionais' });
        } else {
            res.status(200).send({ message: 'Profissionais encontrados com sucesso', professionals: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do GET: ', error);
        res.status(500).send('Erro ao processar dados do GET');
    }
};

exports.getById = async (req, res, next) => {
    try {
        
        const id = req.params.id;
        const professional = await Professionals.findById(id);

        if (!professional) {
            res.status(500).send({ message: 'Erro ao buscar profissional por id' });
        } else {
            res.status(200).send({ message: 'Profissional encontrado com sucesso', professional: professional });
        }

    } catch (error) {
        console.log('Erro ao processar dados do GET por id de profissional: ', error);
        res.status(500).send('Erro ao processar dados do GET por id de profissional');
    }
};

exports.update = async (req, res, next) => {
    try {
        
        const id = req.params.id;
        const professional = {
            name: req.body.name,
            specialty: req.body.specialty,
            contact: req.body.contact,
            phone_number: req.body.phone_number,
            status: req.body.status
        }

        const resp = await Professionals.findByIdAndUpdate(id, professional, { new: true });

        if (!resp) {
            res.status(500).send({ message: 'Erro ao atualizar profissional' });
        } else {
            res.status(200).send({ message: 'Profissional atualizado com sucesso', professional: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do PUT: ', error);
        res.status(500).send('Erro ao processar dados do PUT');
    }
}

exports.delete = async (req, res, next) => {
    try {
        
        const id = req.params.id;

        const resp = await Professionals.findByIdAndDelete(id);

        if (!resp) {
            res.status(500).send({ message: 'Erro ao deletar profissional' });
        } else {
            res.status(200).send({ message: 'Profissional deletado com sucesso', professional: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do DELETE: ', error);
        res.status(500).send('Erro ao processar dados do DELETE');
    }
};
