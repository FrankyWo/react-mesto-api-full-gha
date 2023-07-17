import baseUrl from "./consts";

class Auth {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _getJson(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    register(email, password) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                password: password,
                email: email
              }),
              mode: 'no-cors'
        }).then(this._getJson);
    }

    authorize(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                password: password,
                email: email
              }),
              mode: 'no-cors'
        }).then(this._getJson);
    }

    getUserData(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: { Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          mode: 'no-cors'
        }).then(this._getJson);
    }
}

const auth = new Auth({ baseUrl: baseUrl });

export default auth;
