import {useState} from 'react';
import {login} from '../api/api.ts';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(username, password)
            .then(res => {
                localStorage.setItem('access_token', res.data.access);
                window.location.href = '/';
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Логин"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
            />
            <button type="submit">Войти</button>
        </form>
    );
};

export default Login;