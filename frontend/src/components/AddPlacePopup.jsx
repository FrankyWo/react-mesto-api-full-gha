import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

export default function AddPlacePopup({ onClose, isOpen, onAddNewPlace }) {
    const inputUrlRef = useRef();
    const inputPlaceRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onAddNewPlace(inputUrlRef.current.value, inputPlaceRef.current.value);
    }

    useEffect(() => {
        inputUrlRef.current.value = "";
        inputPlaceRef.current.value = "";
    }, [isOpen]);

    return (
        <PopupWithForm name="add-card" title="Новое место" buttonText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input
                ref={inputPlaceRef}
                id="place"
                type="text"
                minLength="2"
                maxLength="30"
                required
                name="name"
                className="pop-up__input pop-up__input_type_place"
                placeholder="Название"
            />
            <span id="place-error" className="pop-up__error"></span>
            <input
                ref={inputUrlRef}
                id="url"
                type="url"
                required
                name="link"
                className="pop-up__input pop-up__input_type_link"
                placeholder="Ссылка на картинку"
            />
            <span id="url-error" className="pop-up__error"></span>
        </PopupWithForm>
    );
}
