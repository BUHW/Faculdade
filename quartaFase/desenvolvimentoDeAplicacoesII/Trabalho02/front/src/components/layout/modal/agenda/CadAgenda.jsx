import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';

export default function CadAgenda({ open, handleClose }) {
    const [formValues, setFormValues] = useState({
        aluno: '',
        funcionario: '',
        data_agendamento: '',
        hora_inicio: '',
        hora_fim: '',
        tipo_atendimento: '',
        justificativa_ausencia: '',
        observacao: '',
        status: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                        <TextField
                            label="Aluno"
                            variant="standard"
                            fullWidth
                            required
                            type="text"
                            name="aluno"
                            value={formValues.aluno}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Funcionário"
                            variant="standard"
                            fullWidth
                            required
                            type="text"
                            name="funcionario"
                            value={formValues.funcionario}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Data de Agendamento"
                            variant="standard"
                            fullWidth
                            required
                            type="date"
                            name="data_agendamento"
                            value={formValues.data_agendamento}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Hora de Início"
                            variant="standard"
                            fullWidth
                            required
                            type="time"
                            name="hora_inicio"
                            value={formValues.hora_inicio}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Hora de Fim"
                            variant="standard"
                            fullWidth
                            required
                            type="time"
                            name="hora_fim"
                            value={formValues.hora_fim}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Tipo de Atendimento"
                            variant="standard"
                            fullWidth
                            required
                            type="text"
                            name="tipo_atendimento"
                            value={formValues.tipo_atendimento}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Justificativa de Ausência"
                            variant="standard"
                            fullWidth
                            type="text"
                            name="justificativa_ausencia"
                            value={formValues.justificativa_ausencia}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Observação"
                            variant="standard"
                            fullWidth
                            type="text"
                            name="observacao"
                            value={formValues.observacao}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Status"
                            variant="standard"
                            fullWidth
                            required
                            type="number"
                            name="status"
                            value={formValues.status}
                            onChange={handleChange}
                        />
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