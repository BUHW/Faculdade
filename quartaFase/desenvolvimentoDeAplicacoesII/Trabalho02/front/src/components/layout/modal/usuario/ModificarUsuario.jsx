import { Visibility, VisibilityOff } from "@mui/icons-material";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, Input, InputAdornment, InputLabel, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { host, http, port, users } from '../../../../variavel';
import styles from './ModificarUsuario.module.css';

export default function ModificarUsuario({ getUsuarios, selectedUsuarios, isOpen, onClose, editMode }) {
    const [usuario, setUsuario] = useState({
        name: '',
        email: '',
        pwd: '',
        level: '',
    });
    const [alert, setAlert] = useState({ show: false, severity: '', message: '' });
    const [validate, setValidate] = useState({
        upperCase: false,
        lowerCase: false,
        number: false,
        length: false,
        match: false,
        email: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (selectedUsuarios) {
            setUsuario(selectedUsuarios);
        } else {
            clearFields();
        }
    }, [selectedUsuarios]);

    function clearFields() {
        setUsuario({
            name: '',
            email: '',
            pwd: '',
            level: '',
            confimarSenha: ''
        });
    }

    const handleClose = () => {
        setAlert({ ...alert, show: false });
        onClose();
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    function handleChange(e) {
        const { name, value } = e.target;

        setUsuario((prevUsuario) => ({
            ...prevUsuario,
            [name]: value
        }));

        validateInput(name, value);
    }

    const validateInput = (name, value) => {
        if (name === 'email') {
            setValidate((validate) => ({
                ...validate,
                email: validateEmail(value)
            }));
        }

        if (name === 'pwd' || name === 'confimarSenha') {
            validatePassword(name, value);
        }
    };

    const validatePassword = (name, value) => {
        const senha = name === 'pwd' ? value : usuario.pwd || '';
        const confirmPassword = name === 'confimarSenha' ? value : usuario.confimarSenha || '';
        const regexUpperCase = /[A-Z]/;
        const regexLowerCase = /[a-z]/;
        const regexNumber = /[0-9]/;
        const regexSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

        setValidate((validate) => ({
            ...validate,
            upperCase: regexUpperCase.test(senha),
            lowerCase: regexLowerCase.test(senha),
            number: regexNumber.test(senha),
            specialChar: regexSpecialChar.test(senha),
            length: senha.length >= 8,
            match: senha === confirmPassword,
        }));
    };

    const validateEmail = (email) => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    };

    async function postUsuarios(e) {
        e.preventDefault();

        if (!validate.length || !validate.upperCase || !validate.lowerCase || !validate.number || !validate.match || !validate.email) {
            setAlert({
                show: true,
                severity: 'error',
                message: 'Por favor, verifique os requisitos de senha e email.'
            });
            return;
        }

        try {
            const url = editMode
                ? `${http}://${host}:${port}${users}/${selectedUsuarios._id}`
                : `${http}://${host}:${port}${users}`;

            const method = editMode ? 'put' : 'post';

            await axios[method](url, {
                ...usuario,
                level: 'admin',
                status: true
            });

            getUsuarios();
            clearFields();
            setAlert({
                show: true,
                severity: 'success',
                message: editMode ? 'Usuário editado com sucesso' : 'Usuário cadastrado com sucesso'
            });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>{editMode ? "Editar Usuário" : "Cadastrar Usuário"}</DialogTitle>
            <DialogContent>
                <form onSubmit={postUsuarios}>
                    <div className='form-row'>
                        <div className='input-data'>
                            <TextField
                                label="Nome"
                                name="name"
                                fullWidth
                                variant="standard"
                                value={usuario.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='input-data'>
                            <TextField
                                label="Email"
                                name="email"
                                fullWidth
                                variant="standard"
                                value={usuario.email}
                                onChange={handleChange}
                                error={!validate.email && usuario.email !== ''}
                                helperText={!validate.email && usuario.email !== '' ? 'Email inválido' : ''}
                                required
                            />
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='input-data'>
                            <FormControl fullWidth variant="standard">
                                <InputLabel htmlFor="password">Senha</InputLabel>
                                <Input
                                    id="password"
                                    name="pwd"
                                    type={showPassword ? 'text' : 'password'}
                                    value={usuario.pwd}
                                    onChange={handleChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div></div>
                    <div className='form-row'>
                        <div className='input-data'>
                            <FormControl fullWidth variant="standard">
                                <InputLabel htmlFor="confirm-password">Confirmar Senha</InputLabel>
                                <Input
                                    id="confirm-password"
                                    name="confimarSenha"
                                    type={showPassword ? 'text' : 'password'}
                                    value={usuario.confimarSenha}
                                    onChange={handleChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <div className={styles.confirm_password_container}>
                                <p>Senha deve conter:</p>
                                <div className={styles.confirm_password_description}>
                                    <span style={{ color: validate.length ? 'green' : 'red' }}>
                                        {validate.length ? <CheckOutlinedIcon /> : <CloseOutlinedIcon />} Mínimo 8 caracteres
                                    </span>
                                    <span style={{ color: validate.upperCase ? 'green' : 'red' }}>
                                        {validate.upperCase ? <CheckOutlinedIcon /> : <CloseOutlinedIcon />} Uma letra maiúscula
                                    </span>
                                    <span style={{ color: validate.lowerCase ? 'green' : 'red' }}>
                                        {validate.lowerCase ? <CheckOutlinedIcon /> : <CloseOutlinedIcon />} Uma letra minúscula
                                    </span>
                                    <span style={{ color: validate.number ? 'green' : 'red' }}>
                                        {validate.number ? <CheckOutlinedIcon /> : <CloseOutlinedIcon />} Um número
                                    </span>
                                    <span style={{ color: validate.match ? 'green' : 'red' }}>
                                        {validate.match ? <CheckOutlinedIcon /> : <CloseOutlinedIcon />} As senhas coincidem
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogActions>
                        <Button onClick={handleClose} className="btn-secondary">Cancelar</Button>
                        <Button type="submit" className="btn-primary">{editMode ? 'Editar' : 'Cadastrar'}</Button>
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
