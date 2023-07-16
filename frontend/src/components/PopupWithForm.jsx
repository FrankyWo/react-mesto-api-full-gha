export default function PopupWithForm({ title, name, buttonText, isOpen, onClose, onSubmit, children }) {
    return (
        <section className={`pop-up pop-up_type_${name} ${isOpen ? "pop-up_opened" : ""}`}>
            <div className="pop-up__container">
                <button type="button" className="pop-up__close-button" onClick={onClose}></button>
                <form name={name} className={`pop-up__form pop-up__form_type_${name}`} onSubmit={onSubmit} noValidate>
                    <h2 className="pop-up__heading">{title}</h2>
                    {children}
                    <button type="submit" className="pop-up__submit-button">
                        {buttonText}
                    </button>
                </form>
            </div>
        </section>
    );
}
