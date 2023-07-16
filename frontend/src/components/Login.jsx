import { useState } from "react";

export default function Login({ loginUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        loginUser(email, password);
    }
    return (
        <section className="auth-page">
            <h1 className="auth-page__title">Вход</h1>
            <form onSubmit={handleSubmit} className="auth-page__form">
                <input value={email} onChange={handleEmailChange} className="auth-page__input auth-page__input_type_email" placeholder="Email"></input>
                <input
                    value={password}
                    onChange={handlePasswordChange}
                    className="auth-page__input auth-page__input_type_password"
                    placeholder="Пароль"
                    type="password"
                ></input>
                <button type="submit" className="auth-page__button">
                    Войти
                </button>
            </form>
        </section>
    );
}
