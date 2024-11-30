import { Visibility, VisibilityOff } from '@mui/icons-material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Alert, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Snackbar, TextField } from '@mui/material';
import React, { useState } from 'react';
import imgLogin from '../../../assets/img/login.svg';
import logoApae from '../../../assets/img/logoApae.png';
import styles from './Login.module.css';

export default function Login() {

    const [isLogin, setIsLogin] = useState(true);
    const [login, setLogin] = useState({ email: '', senha: '' })
    const [alert, setAlert] = useState({ show: false, severity: '', message: '' });
    const [cadastro, setCadastro] = useState({ email: '', nome: '', senha: '' })
    const [validate, setValidate] = useState({
        upperCase: false,
        lowerCase: false,
        number: false,
        length: false,
        match: false,
        email: false,
    });

    function handleChange(e) {
        const { name, value } = e.target;

        if (isLogin) {
            setLogin((login) => ({
                ...login,
                [name]: value
            }))
        } else {
            setCadastro((cadastro) => ({
                ...cadastro,
                [name]: value
            }))
        }

        validateInput(name, value);
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClose = () => {
        setAlert({ ...alert, show: false });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    function loginOrCreate() {
        // Implement your login or create account logic here
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (validatePassword()) {
            loginOrCreate();
        }
    }

    const validateInput = (name, value) => {
        if (name === 'email') {
            setValidate((validate) => ({
                ...validate,
                email: validateEmail(value)
            }));
        }

        if (name === 'senha' || name === 'confimarSenha') {
            securityPassword(name, value);
        }
    };

    const securityPassword = (name, value) => {
        const senha = name === 'senha' ? value : cadastro.senha || '';
        const confirmPassword = name === 'confimarSenha' ? value : cadastro.confimarSenha || '';
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

    const validatePassword = () => {
        const invalidRequirements = [];
        if (!validate.email) invalidRequirements.push('Email inválido');
        if (!validate.length) invalidRequirements.push('Mínimo 8 caracteres');
        if (!validate.upperCase) invalidRequirements.push('Uma letra maiúscula');
        if (!validate.lowerCase) invalidRequirements.push('Uma letra minúscula');
        if (!validate.number) invalidRequirements.push('Um número');
        if (!validate.match) invalidRequirements.push('As senhas coincidem');

        if (invalidRequirements.length > 0) {
            setAlert({ show: true, severity: 'error', message: `Por favor, verifique os seguintes requisitos: ${invalidRequirements.join(', ')}` });
            return false;
        }
        return true;
    };

    return (
        <section className={styles.container}>
            <div className={styles.left}>
                <img src={imgLogin} alt={imgLogin} />
            </div>
            <div className={styles.right}>
                {isLogin ? (
                    <form onSubmit={handleSubmit}>
                        <img src={logoApae} alt={logoApae} />
                        <div>
                            <h1>Seja Bem-Vindo!!</h1>
                            <p>Por favor insira seu email e login para entrar ou crie uma conta!!</p>
                        </div>

                        <div className='form-row'>
                            <TextField
                                label="Insira seu e-mail"
                                variant="standard"
                                fullWidth
                                required
                                type="text"
                                name="email"
                                value={login.email || ''}
                                onChange={handleChange}
                                error={!validate.email && login.email !== ''}
                                helperText={!validate.email && login.email !== '' ? 'Email inválido' : ''}
                            />
                        </div>
                        <div className='form-row'>
                            <FormControl sx={{ width: '100%' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Insira sua senha</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={handleChange}
                                    name='senha'
                                    value={login.senha || ''}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={
                                                    showPassword ? 'hide the password' : 'display the password'
                                                }
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>

                        <div className={styles.container_button}>
                            <Button variant="contained" className='btn-primary' type="submit">
                                LOGIN
                            </Button>
                        </div>

                        <p>Novo por aqui? <button onClick={() => setIsLogin(!isLogin)}>Criar conta</button></p>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <img src={logoApae} alt={logoApae} />
                        <div>
                            <h1>Cadastre-se</h1>
                            <p>Crie sua conta inserindo as informações abaixo</p>
                        </div>
                        <div className='form-row'>
                            <TextField
                                label="Insira seu e-mail"
                                variant="standard"
                                fullWidth
                                required
                                type="text"
                                name="email"
                                value={cadastro.email || ''}
                                onChange={handleChange}
                                error={!validate.email && cadastro.email !== ''}
                                helperText={!validate.email && cadastro.email !== '' ? 'Email inválido' : ''}
                            />
                        </div>
                        <div className='form-row'>
                            <TextField
                                label="Insira seu nome"
                                variant="standard"
                                fullWidth
                                required
                                type="text"
                                name="nome"
                                value={cadastro.nome || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='form-row'>
                            <FormControl sx={{ width: '100%' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Insira sua senha</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={handleChange}
                                    name='senha'
                                    value={cadastro.senha || ''}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={
                                                    showPassword ? 'hide the password' : 'display the password'
                                                }
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>
                        <div className='form-row'>
                            <FormControl sx={{ width: '100%' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Confirme sua senha</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={handleChange}
                                    name='confimarSenha'
                                    value={cadastro.confimarSenha || ''}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label={
                                                    showPassword ? 'hide the password' : 'display the password'
                                                }
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>
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
                        <div className={styles.container_button}>
                            <Button variant="contained" className='btn-primary' type="submit">
                                Cadastrar
                            </Button>
                        </div>
                        <p>Já possui uma conta? <button onClick={() => setIsLogin(!isLogin)}>Sim</button></p>
                    </form>
                )}
            </div>

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
        </section>
    )
}