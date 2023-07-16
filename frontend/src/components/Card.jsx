import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onLikeClick, onDeleteClick }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const cardLikeButtonClassName = `card__like-button ${isLiked && "card__like-button_active"}`;

    function handleClick() {
        onCardClick(card);
    }
    function handleLikeClick() {
        onLikeClick(card);
    }
    function handleDeleteClick() {
        onDeleteClick(card);
    }

    return (
        <li className="cards-grid__card card">
            <div className="card__image-container">
                <img src={card.link} alt={card.name} className="card__image" onClick={handleClick} />
            </div>
            {isOwn && <button type="button" className="card__delete-button" onClick={handleDeleteClick} />}
            <div className="card__caption-container">
                <h2 className="card__caption">{card.name}</h2>
                <div className="card__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="card__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}
