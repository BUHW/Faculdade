import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { events, host, http, port } from '../../../../variavel';

export default function CadAgenda({ open, handleClose, getEvent, selectedSlot, editMode }) {
    const [agenda, setAgenda] = useState({
        title: '',
        description: '',
        date: '',
        start: '',
        end: '',
        location: '',
        participantes: ''
    });

    useEffect(() => {
        if (selectedSlot && editMode) {
            const start = moment(selectedSlot.start);
            const end = moment(selectedSlot.end);
    
            setAgenda({
                id: selectedSlot.id,
                title: selectedSlot.title,
                description: selectedSlot.description,
                date: start.format('YYYY-MM-DD'),
                start: start.format('HH:mm'),
                end: end.format('HH:mm'),
                location: selectedSlot.location,
                participantes: selectedSlot.participantes,
            });
        } else {
            setAgenda({
                title: '',
                description: '',
                date: '',
                start: '',
                end: '',
                location: '',
                participantes: ''
            });
        }
    }, [selectedSlot, editMode]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAgenda({
            ...agenda,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const startUtc = moment(`${agenda.date}T${agenda.start}`).utc().format();
        const endUtc = moment(`${agenda.date}T${agenda.end}`).utc().format();
    
        try {
            const url = editMode
                ? `${http}://${host}:${port}${events}/${agenda.id}`
                : `${http}://${host}:${port}${events}`;
            const method = editMode ? 'put' : 'post';
    
            await axios[method](url, {
                ...agenda,
                start: startUtc,
                end: endUtc,
            });
    
            setAgenda({
                title: '',
                description: '',
                date: '',
                start: '',
                end: '',
                location: '',
                participantes: ''
            });
    
            getEvent();
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };
    

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Agendar consulta"}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <div className='form-row'>
                            <div className='input-data'>
                                <TextField
                                    label="Titulo do evento"
                                    variant="standard"
                                    fullWidth
                                    required
                                    type="text"
                                    name="title"
                                    value={agenda.title}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='input-data'>
                                <TextField
                                    label="Data do evento"
                                    variant="standard"
                                    fullWidth
                                    required
                                    type="Date"
                                    name="date"
                                    value={agenda.date}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='input-data'>
                                <TextField
                                    label="Hora inicial"
                                    variant="standard"
                                    fullWidth
                                    required
                                    type="time"
                                    name="start"
                                    focused
                                    value={agenda.start}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='input-data'>
                                <TextField
                                    label="Hora final"
                                    variant="standard"
                                    fullWidth
                                    required
                                    type="time"
                                    name="end"
                                    focused
                                    value={agenda.end}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='input-data'>
                                <TextField
                                    label="Localização"
                                    variant="standard"
                                    fullWidth
                                    type="text"
                                    name="location"
                                    value={agenda.location}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='input-data'>
                                <TextField
                                    label="Participantes"
                                    variant="standard"
                                    fullWidth
                                    required
                                    type="text"
                                    name="participantes"
                                    value={agenda.participantes}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='input-data'>
                                <TextField
                                    label="Descrição do evento"
                                    variant="standard"
                                    fullWidth
                                    required
                                    multiline
                                    rows={3}
                                    type="text"
                                    name="description"
                                    value={agenda.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    <DialogActions>
                        {editMode && (
                        <Button onClick={handleDelete} className='btn-danger'>DELETAR</Button>
                        )}
                        <Button onClick={handleClose} className='btn-secondary'>FECHAR</Button>
                        <Button type="submit" autoFocus className='btn-primary'>
                        {editMode ? 'EDITAR' : 'CADASTRAR'}
                        </Button>
                    </DialogActions>

                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}