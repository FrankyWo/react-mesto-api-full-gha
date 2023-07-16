import logo from '../images/logo.svg';
import { Link, Route, Routes } from 'react-router-dom';

function Header({ logOut, email }) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="header__link-container">
                            <p className="header__email">{email}</p>
                            <Link onClick={logOut} to="/signin" className="header__link">
                                Выйти
                            </Link>
                        </div>
                    }
                />
                <Route
                    path="/signin"
                    element={
                        <Link to="/signup" className="header__link">
                            Регистрация
                        </Link>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <Link to="/signin" className="header__link">
                            Войти
                        </Link>
                    }
                />
            </Routes>
            
        </header>
    );
}

export default Header;
