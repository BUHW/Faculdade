const { Appointments } = require('../models/appointments');

exports.create = async (req, res, next) => {
    try {

        const appointment = new Appointments({
            name: req.body.name,
            specialty: req.body.specialty,
            comments: req.body.comments,
            phone_number: req.body.phone_number,
            date: req.body.date,
            student: req.body.student,
            professional: req.body.professional,
            status: req.body.status
        });

        const resp = await Appointments.create(appointment);

        if (!resp) {
            res.status(500).send({ message: 'Erro ao criar agendamento' });
        } else {
            res.status(200).send({ message: 'Agendamento criado com sucesso', appointment: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do POST: ', error);
        res.status(500).send('Erro ao processar dados do POST');
    }
};

exports.getAll = async (req, res, next) => {
    try {
        
        const resp = await Appointments.find().populate('student').populate('professional');

        if (!resp) {
            res.status(500).send({ message: 'Erro ao buscar agendamentos' });
        } else {
            res.status(200).send({ message: 'Agendamentos encontrados com sucesso', appointments: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do GET: ', error);
        res.status(500).send('Erro ao processar dados do GET');
    }
};

exports.getById = async (req, res, next) => {
    try {
        
        const id = req.params.id;
        const appointment = await Appointments.findById(id).populate('student').populate('professional');

        if (!appointment) {
            res.status(500).send({ message: 'Erro ao buscar agendamento por id' });
        } else {
            res.status(200).send({ message: 'Agendamento encontrado com sucesso', appointment: appointment });
        }

    } catch (error) {
        console.log('Erro ao processar dados do GET por id de agendamento: ', error);
        res.status(500).send('Erro ao processar dados do GET por id de agendamento');
    }
};

exports.update = async (req, res, next) => {
    try {
        
        const id = req.params.id;
        const appointment = {
            name: req.body.name,
            specialty: req.body.specialty,
            comments: req.body.comments,
            phone_number: req.body.phone,
            date: req.body.date,
            student: req.body.student,
            professional: req.body.professional,
            status: req.body.status
        }

        const resp = await Appointments.findByIdAndUpdate(id, appointment, { new: true }).populate('student').populate('professional');

        if (!resp) {
            res.status(500).send({ message: 'Erro ao atualizar agendamento' });
        } else {
            res.status(200).send({ message: 'Agendamento atualizado com sucesso', appointment: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do PUT: ', error);
        res.status(500).send('Erro ao processar dados do PUT');
    }
}

exports.delete = async (req, res, next) => {
    try {
        
        const id = req.params.id;

        const resp = await Appointments.findByIdAndDelete(id);

        if (!resp) {
            res.status(500).send({ message: 'Erro ao deletar agendamento' });
        } else {
            res.status(200).send({ message: 'Agendamento deletado com sucesso', appointment: resp });
        }

    } catch (error) {
        console.log('Erro ao processar dados do DELETE: ', error);
        res.status(500).send('Erro ao processar dados do DELETE');
    }
};
