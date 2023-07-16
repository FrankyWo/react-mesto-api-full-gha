import { useContext } from "react";
import Card from "./Card";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onLikeClick, onDeleteClick, cards }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <button onClick={onEditAvatar} type="button" className="profile__avatar-button">
            <img src={currentUser.avatar} alt="Аватар профиля" className="profile__avatar" />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button onClick={onEditProfile} type="button" className="profile__edit-button"></button>
            <p className="profile__caption">{currentUser.about}</p>
          </div>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__add-button"></button>
      </section>
      <section className="cards-grid">
        <ul className="cards-grid__list">
          {cards.map((card) => {
            return <Card card={card} key={card._id} onCardClick={onCardClick} onLikeClick={onLikeClick} onDeleteClick={onDeleteClick} />;
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
