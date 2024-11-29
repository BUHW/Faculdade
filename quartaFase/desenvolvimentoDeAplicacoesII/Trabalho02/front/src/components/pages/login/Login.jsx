import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import React, { useState } from 'react';
import imgLogin from '../../../assets/img/login.svg';
import logoApae from '../../../assets/img/logoApae.png';
import styles from './Login.module.css';

export default function Login() {

    const [isLogin, setIsLogin] = useState(true);
    const [Login, setLogin] = useState({ email: '', senha: '' })

    function handleChange(e) {
        const { name, value } = e.target;
        setLogin((login) => ({
            ...login,
            [name]: value
        }))

        console.log(Login);
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    return (
        <section className={styles.container}>
            <div className={styles.left}>
                <img src={imgLogin} alt={imgLogin} />
            </div>
            <div className={styles.right}>
                {isLogin ? (
                    <form>
                        <img src={logoApae} alt={logoApae} />
                        <div>
                            <h1>Seja bem vindo!!</h1>
                            <p>Por favor insira seu email e login para entrar ou crie uma conta!!</p>
                        </div>
                        <div >
                            <div className='form-row'>
                                <TextField
                                    label="Insira seu Email"
                                    variant="standard"
                                    fullWidth
                                    required
                                    type="text"
                                    name="email"
                                    value={Login.email || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form-row'>
                                <FormControl sx={{ width: '100%' }} variant="standard">
                                    <InputLabel htmlFor="standard-adornment-password">Insira sua Senha</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={handleChange}
                                        name='senha'
                                        value={Login.senha || ''}
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
                        </div>
                        <div className={styles.container_button}>
                            <Button variant="contained" className='btn-primary' type="submit">
                                LOGIN
                            </Button>
                        </div>

                        <p>Novo por aqui? <button onClick={() => setIsLogin(!isLogin)}>Criar conta</button></p>
                    </form>
                ) : (
                    <div>
                        <h1>cadastro</h1>
                        <p>Já possui uma conta? <button onClick={() => setIsLogin(!isLogin)}>Sim</button></p>
                    </div>
                )}
            </div>
        </section>
    )
}