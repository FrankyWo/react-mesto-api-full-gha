export default function ImagePopup({ card, onClose, isOpen }) {
    return (
        <section className={`pop-up pop-up_type_open-image ${isOpen ? "pop-up_opened" : ""}`}>
            <div className="pop-up__container pop-up__container_type_open-image">
                <button type="button" className="pop-up__close-button" onClick={onClose}></button>
                <figure className="pop-up__figure">
                    <img src={card.link} alt={card.name} className="pop-up__image" />
                    <figcaption className="pop-up__image-caption">{card.name}</figcaption>
                </figure>
            </div>
        </section>
    );
}
