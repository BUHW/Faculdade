import { useState } from 'react';
import imgLogin from '../../../assets/img/login.svg';
import style from './Login.module.css';

export default function Login() {

    const [isLogin, setIsLogin] = useState(true);

    return (
        <section>
            <div className={style.left}>
                <img src={imgLogin} alt={imgLogin} />
            </div>
            <div>
                
            </div>
        </section>
    )
}