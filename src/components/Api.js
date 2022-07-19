export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(res => {
                this._getResponseData(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => {
                this._getResponseData(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    updateProfileInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        })
            .then(res => {
                this._getResponseData(res);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    createNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => {
                this._getResponseData(res);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    deleteCard(data, cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            headers: this._headers,
            method: 'DELETE',
            body: JSON.stringify(data)
        })
            .then(res => {
                this._getResponseData(res);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    updateProfileAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        })
            .then(res => {
                this._getResponseData(res);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    likeCard(data, cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: 'PUT',
            body: JSON.stringify(data)
        })
            .then(res => {
                this._getResponseData(res);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    dislikeCard(data, cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: 'DELETE',
            body: JSON.stringify(data)
        })
            .then(res => {
                this._getResponseData(res);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }
}
