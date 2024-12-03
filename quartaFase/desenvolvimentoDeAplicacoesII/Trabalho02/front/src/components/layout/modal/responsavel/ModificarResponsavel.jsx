import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { mphone } from "../../../../utils/MaskCell";
import { appointments, host, http, port } from '../../../../variavel';

export default function ModificarResponsavel({ getResponsavel, selectedResponsavel, isOpen, onClose, editMode }) {
    const [responsavel, setResponsavel] = useState({
        name: '',
        specialty: '',
        phone_number: '',
        date: '',
        student: ''
    });
    const [alert, setAlert] = useState({ show: false, severity: '', message: '' });

    function clearFields() {
        setResponsavel({
            name: '',
            specialty: '',
            phone_number: '',
            date: '',
            student: ''
        });
    }

    useEffect(() => {
        if (selectedResponsavel) {
            setResponsavel(selectedResponsavel);
        } else {
            setResponsavel({
                name: '',
                specialty: '',
                phone_number: '',
                date: '',
                student: ''
            });
        }
    }, [selectedResponsavel]);

    const handleClose = () => {
        setAlert({ ...alert, show: false });
        onClose();
    };

    function handleChange(e) {
        const { name, value } = e.target;

        let isValid = true;

        if (name === 'age') {
            isValid = /^\d*$/.test(value);
        }

        if (name === 'phone_number') {
            const maskedValue = mphone(value);
            if (maskedValue.length > 15) return;
            setResponsavel((prevresponsavel) => ({
                ...prevresponsavel,
                [name]: maskedValue,
            }));
            return;
        }

        if (isValid) {
            setResponsavel((prevresponsavel) => ({
                ...prevresponsavel,
                [name]: value
            }));
        }
    }

    async function postResponsavels(e) {
        e.preventDefault();
        if (!editMode) {
            try {
                await axios.post(`${http}://${host}:${port}${appointments}`, {
                    ...responsavel,
                    status: true
                });
                getResponsavel();
                clearFields();
                setAlert({ show: true, severity: 'success', message: 'Responsável cadastrado com sucesso' })
            } catch (e) {
                console.error(e);
            }
        } else {
            try {
                await axios.put(`${http}://${host}:${port}${appointments}/${selectedResponsavel._id}`, {
                    ...responsavel,
                    status: true
                });
                getResponsavel();
                setAlert({ show: true, severity: 'success', message: 'Responsável editado com sucesso' })
            } catch (e) {
                console.error(e);
            }
        }
    }

    async function deleteResponsavel() {
        try {
            await axios.delete(`${http}://${host}:${port}${appointments}/${selectedResponsavel._id}`);
            getResponsavel();
            setAlert({ show: true, severity: 'success', message: 'Responsável deletado com sucesso' });
            handleClose();
        } catch (e) {
            console.error(e);
            setAlert({ show: true, severity: 'error', message: 'Erro ao deletar responsável' });
        }
    }

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {editMode ? "Editar responsável" : "Cadastrar responsável"}
            </DialogTitle>
            <DialogContent>
                <form onSubmit={postResponsavels}>
                    <div className='form-row'>
                        <div className='input-data'>
                            <TextField
                                label="Insira um nome"
                                variant="standard"
                                fullWidth
                                required
                                type="text"
                                name="name"
                                value={responsavel.name || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input-data'>
                            <TextField
                                label="Insira uma especialidade"
                                variant="standard"
                                fullWidth
                                required
                                type="text"
                                name="specialty"
                                value={responsavel.specialty || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='input-data'>
                            <TextField
                                label="Insira seu número de telefone"
                                variant="standard"
                                fullWidth
                                required
                                type="text"
                                name="phone_number"
                                value={responsavel.phone_number || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input-data'>
                            <TextField
                                label="Data de aniversário"
                                variant="standard"
                                fullWidth
                                required
                                type="date"
                                name="date"
                                focused
                                value={responsavel.date || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='input-data'>
                            <TextField
                                label="Nome do aluno"
                                variant="standard"
                                fullWidth
                                required
                                type="text"
                                name="student"
                                value={responsavel.student || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <DialogActions>
                        <Button onClick={handleClose} className='btn-secondary'>FECHAR</Button>
                        <Button type="submit" autoFocus className='btn-primary'>
                            {editMode ? 'EDITAR' : 'CADASTRAR'}
                        </Button>
                        {editMode && (
                            <Button onClick={deleteResponsavel} className='btn-danger'>
                                DELETAR
                            </Button>
                        )}
                    </DialogActions>
                </form>
            </DialogContent>
            <Snackbar
                open={alert.show}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={alert.severity} variant="filled" sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </Dialog>
    );
}