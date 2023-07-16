import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar }) {
    const inputUrlRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(inputUrlRef.current.value);
    }
    useEffect(() => {
        inputUrlRef.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm name="avatar-update" title="Обновить аватар" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input
                ref={inputUrlRef}
                id="avatar-url"
                type="url"
                required
                name="link"
                className="pop-up__input pop-up__input_type_link"
                placeholder="Ссылка на картинку"
            />
            <span id="avatar-url-error" className="pop-up__error"></span>
        </PopupWithForm>
    );
}
