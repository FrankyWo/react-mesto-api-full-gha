import regOk from "../images/Reg-ok.svg";
import regFail from "../images/Reg-fail.svg";

export default function InfoTooltip({ isOpen, onClose, isRegistrationSuccess }) {
    return (
        <section className={`pop-up ${isOpen ? "pop-up_opened" : ""}`}>
            <div className="pop-up__container pop-up__container_type_info">
                <button type="button" className="pop-up__close-button" onClick={onClose}></button>

                <img className="pop-up__icon" src={isRegistrationSuccess ? regOk : regFail} alt="" />

                <h2 className="pop-up__heading pop-up__heading_type_info">
                    {`${isRegistrationSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}`}
                </h2>
            </div>
        </section>
    );
}
