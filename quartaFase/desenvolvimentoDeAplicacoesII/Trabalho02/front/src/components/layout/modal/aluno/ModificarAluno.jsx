import { Alert, Snackbar, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import * as React from 'react';
import { mphone } from '../../../../utils/MaskCell';
import { host, http, port, students } from '../../../../variavel';

export default function ModificarAluno({ getAlunos, selectedAluno, isOpen, onClose, editMode }) {
    const [aluno, setAluno] = React.useState({
        name: '',
        age: '',
        parents: '',
        phone_number: '',
        special_needs: '',
    });
    const [alert, setAlert] = React.useState({ show: false, severity: '', message: '' });

    React.useEffect(() => {
        if (selectedAluno) {
            setAluno(selectedAluno);
        } else {
            setAluno({
                name: '',
                age: '',
                parents: '',
                phone_number: '',
                special_needs: '',
            });
        }
    }, [selectedAluno]);

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
            setAluno((prevAluno) => ({
                ...prevAluno,
                [name]: maskedValue,
            }));
            return;
        }

        if (isValid) {
            setAluno((prevAluno) => ({
                ...prevAluno,
                [name]: value
            }));
        }
    }

    async function postAlunos(e) {
        e.preventDefault();
        if (!editMode) {
            try {
                await axios.post(`${http}://${host}:${port}${students}`, {
                    ...aluno,
                    status: true
                });
                getAlunos();
                setAlert({ show: true, severity: 'success', message: 'Aluno cadastrado com sucesso' })
            } catch (e) {
                console.error(e);
            }
        } else {
            try {
                await axios.put(`${http}://${host}:${port}${students}/${selectedAluno._id}`, {
                    ...aluno,
                    status: true
                });
                getAlunos();
                setAlert({ show: true, severity: 'success', message: 'Aluno editado com sucesso' })
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
                {editMode ? "Editar Aluno" : "Cadastrar Aluno"}
            </DialogTitle>
            <DialogContent>
                <form onSubmit={postAlunos}>
                    <div className='form-row'>
                        <div className='input-data'>
                            <TextField
                                label="Insira seu nome"
                                variant="standard"
                                fullWidth
                                required
                                type="text"
                                name="name"
                                value={aluno.name || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input-data'>
                            <TextField
                                label="Insira sua idade"
                                variant="standard"
                                fullWidth
                                required
                                type="text"
                                name="age"
                                value={aluno.age || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='input-data'>
                            <TextField
                                label="Insira seu responsável"
                                variant="standard"
                                fullWidth
                                required
                                type="text"
                                name="parents"
                                value={aluno.parents || ''}
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
                                value={aluno.phone_number || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='input-data'>
                            <TextField
                                label="Insira condição especial caso tenha"
                                variant="standard"
                                fullWidth
                                multiline
                                rows={3}
                                type="text"
                                name="special_needs"
                                value={aluno.special_needs || ''}
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