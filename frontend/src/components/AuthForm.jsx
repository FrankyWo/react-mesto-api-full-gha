import useForm from "../hooks/useForm";

export default function AuthForm({ title, buttonText, onSubmit, children }) {
    const { values, handleChange, setValues } = useForm({ email: "", password: "" });

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(values.email, values.password);
    }

    return (
        <section className="auth-page">
            <h1 className="auth-page__title">{title}</h1>
            <form onSubmit={handleSubmit} className="auth-page__form">
                <input value={values.email} onChange={handleChange} className="auth-page__input auth-page__input_type_email" placeholder="Email"></input>
                <input
                    value={values.password}
                    onChange={handleChange}
                    className="auth-page__input auth-page__input_type_password"
                    placeholder="Пароль"
                    type="password"
                ></input>
                <button type="submit" className="auth-page__button">
                    {buttonText}
                </button>
            </form>
            {children}
        </section>
    );
}