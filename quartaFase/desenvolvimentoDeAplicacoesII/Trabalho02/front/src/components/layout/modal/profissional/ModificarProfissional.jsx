import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { mphone } from "../../../../utils/MaskCell";
import { host, http, port, professionals } from '../../../../variavel';

export default function ModificarProfissional({ getProfissionais, selectedProfissional, isOpen, onClose, editMode }) {
    const [profissional, setProfissional] = useState({
        name: '',
        specialty: '',
        contact: '',
        phone_number: '',
    });
    const [alert, setAlert] = useState({ show: false, severity: '', message: '' });

    function clearFields() {
        setProfissional({
            name: '',
            specialty: '',
            contact: '',
            phone_number: '',
        });
    }

    useEffect(() => {
        if (selectedProfissional) {
            setProfissional(selectedProfissional);
        } else {
            setProfissional({
                name: '',
                specialty: '',
                contact: '',
                phone_number: '',
            });
        }
    }, [selectedProfissional]);

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
            setProfissional((prevprofissional) => ({
                ...prevprofissional,
                [name]: maskedValue,
            }));
            return;
        }

        if (isValid) {
            setProfissional((prevprofissional) => ({
                ...prevprofissional,
                [name]: value
            }));
        }
    }

    async function postprofissionals(e) {
        e.preventDefault();
        if (!editMode) {
            try {
                await axios.post(`${http}://${host}:${port}${professionals}`, {
                    ...profissional,
                    status: true
                });
                getProfissionais();
                clearFields();
                setAlert({ show: true, severity: 'success', message: 'profissional cadastrado com sucesso' })
            } catch (e) {
                console.error(e);
            }
        } else {
            try {
                await axios.put(`${http}://${host}:${port}${professionals}/${selectedProfissional._id}`, {
                    ...profissional,
                    status: true
                });
                getProfissionais();
                setAlert({ show: true, severity: 'success', message: 'profissional editado com sucesso' })
            } catch (e) {
                console.error(e);
            }
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
                {editMode ? "Editar profissional" : "Cadastrar profissional"}
            </DialogTitle>
            <DialogContent>
                <form onSubmit={postprofissionals}>
                    <div className='form-row'>
                        <div className='input-data'>
                            <TextField
                                label="Insira seu nome"
                                variant="standard"
                                fullWidth
                                required
                                type="text"
                                name="name"
                                value={profissional.name || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input-data'>
                            <TextField
                                label="Insira sua especialidade"
                                variant="standard"
                                fullWidth
                                required
                                type="text"
                                name="specialty"
                                value={profissional.specialty || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='input-data'>
                            <TextField
                                label="Insira seu contato(ex: e-mail)"
                                variant="standard"
                                fullWidth
                                required
                                type="text"
                                name="contact"
                                value={profissional.contact || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input-data'>
                            <TextField
                                label="Insira seu número de telefone"
                                variant="standard"
                                fullWidth
                                required
                                type="text"
                                name="phone_number"
                                value={profissional.phone_number || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <DialogActions>
                        <Button onClick={handleClose} className='btn-secondary'>FECHAR</Button>
                        <Button type="submit" autoFocus className='btn-primary'>
                            {editMode ? 'EDITAR' : 'CADASTRAR'}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
            <Snackbar
                open={alert.show} e
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