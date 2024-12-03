const { Events } = require('../models/events');

exports.create = async (req, res, next) => {
    try {

        const events = new Events({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            start: req.body.start,
            end: req.body.end,
            location: req.body.location,
            participantes: req.body.participantes
        });

        const resp = await Events.create(events);

        if (!resp) {
            res.status(500).send({ message: 'Erro ao criar eventoo' });
        } else {
            res.status(200).send({ message: 'Evento criado com sucesso', content: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do POST: ', error);
        res.status(500).send('Erro ao processar dados do POST');
    }
};

exports.getAll = async (req, res, next) => {
    try {
        
        const resp = await Events.find();

        if (!resp) {
            res.status(500).send({ message: 'Erro ao buscar eventos' });
        } else {
            res.status(200).send({ message: 'Eventos encontrados com sucesso', content: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do GET: ', error);
        res.status(500).send('Erro ao processar dados do GET');
    }
};

exports.getById = async (req, res, next) => {
    try {
        
        const id = req.params.id;
        const event = await Events.findById(id);

        if (!event) {
            res.status(500).send({ message: 'Erro ao buscar evento por id' });
        } else {
            res.status(200).send({ message: 'Evento encontrado com sucesso', content: professional });
        }

    } catch (error) {
        console.log('Erro ao processar dados do GET por id de profissional: ', error);
        res.status(500).send('Erro ao processar dados do GET por id de profissional');
    }
};

exports.update = async (req, res, next) => {
    try {
        
        const id = req.params.id;
        const events = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            start: req.body.start,
            end: req.body.end,
            location: req.body.location,
            participantes: req.body.participantes
        }

        const resp = await Events.findByIdAndUpdate(id, events, { new: true });

        if (!resp) {
            res.status(500).send({ message: 'Erro ao atualizar Eventos' });
        } else {
            res.status(200).send({ message: 'Eventos atualizado com sucesso', content: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do PUT: ', error);
        res.status(500).send('Erro ao processar dados do PUT');
    }
}

exports.delete = async (req, res, next) => {
    try {
        
        const id = req.params.id;

        const resp = await Events.findByIdAndDelete(id);

        if (!resp) {
            res.status(500).send({ message: 'Erro ao deletar evento' });
        } else {
            res.status(200).send({ message: 'Evento deletado com sucesso', content: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do DELETE: ', error);
        res.status(500).send('Erro ao processar dados do DELETE');
    }
};
