import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import '../index.css';

import api from '../utils/Api';
import auth from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRouteElement from './ProtectedRoute';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [isRegistrationSuccess, setRegistrationSuccess] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
    }, []);

    useEffect(() => {
        if (!token) {
            return;
        }
        auth
            .getUserData(token)
            .then((userData) => {
                setUserData(userData);
                setIsLoggedIn(true);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    }, [token, navigate]);

    const registerUser = (email, password) => {
        auth
            .register(email, password)
            .then((res) => {
                localStorage.setItem('token', res.token);
                setToken(res.token);
                setRegistrationSuccess(true);
                setIsInfoTooltipOpen(true);
                navigate('/signin');
            })
            .catch((err) => {
                setRegistrationSuccess(false);
                setIsInfoTooltipOpen(true);
                console.log(err);
            });
    };

    const loginUser = (email, password) => {
        auth
            .authorize(email, password)
            .then((res) => {
                
                localStorage.setItem('token', res.token);
                setToken(res.token);
                setUserData(userData);
            })
            .catch((err) => {
                setIsInfoTooltipOpen(true);
                console.log(err);
            });
    };

    const logOut = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setToken('');
        setUserData({
            email: '',
            password: '',
        });
        setCurrentUser(userData);
        navigate('/signin');
    };

    useEffect(() => {
        // api.setToken(token);
        // debugger;
        if (!token) {
            return;
        }
        api.setToken(token);
        api
            .getCurrentUser()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userData, token]);

    useEffect(() => {
        if (!token) {
            return;
        }
        api.setToken(token);
        // debugger;
        api
            .getInitialCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userData, token]);

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleCardClick(card) {
        setSelectedCard(card);
        setImagePopupOpen(true);
    }
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoTooltipOpen(false);
        setImagePopupOpen(false);
        setSelectedCard({});
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((like) => like === currentUser._id);
        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleDeleteClick(card) {
        api
            .deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => (c._id === card._id ? false : true)));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateUser(inputData) {
        api
            .patchUserProfile(inputData)
            .then((userData) => {
                setCurrentUser(userData);
            })
            .then(() => closeAllPopups())
            .catch((err) => {
                console.log(err);
            });
    }
    function handleUpdateAvatar(inputData) {
        api
            .patchUserAvatar(inputData)
            .then((userData) => {
                setCurrentUser(userData);
            })
            .then(() => closeAllPopups())
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(link, caption) {
        api
            .postCard(link, caption)
            .then((newCard) => setCards([newCard, ...cards]))
            .then(() => closeAllPopups())
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="container">
                <Header logOut={logOut} email={userData.email} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRouteElement
                                isLoggedIn={isLoggedIn}
                                component={Main}
                                path="/"
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                onLikeClick={handleCardLike}
                                onDeleteClick={handleDeleteClick}
                                cards={cards}
                            />
                        }
                    />
                    <Route path="/signup" element={<Register registerUser={registerUser} />} />
                    <Route path="/signin" element={<Login loginUser={loginUser} />} />
                    <Route
                        path="*"
                        element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />}
                    />
                </Routes>

                <Footer />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddNewPlace={handleAddPlaceSubmit} />

                <PopupWithForm name="confirm" title="Вы уверены" buttonText="Да"></PopupWithForm>

                <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />

                <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isRegistrationSuccess={isRegistrationSuccess} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
