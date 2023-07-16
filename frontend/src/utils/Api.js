import baseUrl from "./consts";

class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    setToken(token) { this._headers.Authorization = `Bearer ${token}`; }
    _getJson(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        }).then(this._getJson);
    }

    getCurrentUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then(this._getJson);
    }

    patchUserProfile(newData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: newData.name,
                about: newData.about,
            }),
        }).then(this._getJson);
    }

    patchUserAvatar(newAvatarLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: newAvatarLink,
            }),
        }).then(this._getJson);
    }

    postCard(newLink, newCaption) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                link: newLink,
                name: newCaption,
            }),
        }).then(this._getJson);
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._getJson);
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: "PUT",
                headers: this._headers,
            }).then(this._getJson);
        } else {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                method: "DELETE",
                headers: this._headers,
            }).then(this._getJson);
        }
    }
}

const api = new Api({
    baseUrl: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});
export default api;
