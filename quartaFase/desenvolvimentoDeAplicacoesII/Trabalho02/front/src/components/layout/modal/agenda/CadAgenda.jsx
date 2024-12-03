import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import { events, host, http, port } from '../../../../variavel';

export default function CadAgenda({ open, handleClose, getEvent }) {
    const [agenda, setAgenda] = useState({
        title: '',
        description: '',
        start: '',
        end: '',
        location: '',
        participantes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAgenda({
            ...agenda,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const resp = await axios.post(`${http}://${host}:${port}${events}`, {
                ...agenda,
                start: moment(agenda.start, "HH:mm").format(),
                end: moment(agenda.end, "HH:mm").format(),
            });

            setAgenda({
                title: '',
                description: '',
                start: '',
                end: '',
                location: '',
                participantes: ''
            });
            setAgenda(resp.data);
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
                                    label="Data inicial"
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
                                    label="Data final"
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
                            <Button onClick={handleClose} className='btn-secondary'>FECHAR</Button>
                            <Button type="submit" autoFocus className='btn-primary'>
                                CADASTRAR
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
