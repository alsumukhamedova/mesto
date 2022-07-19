export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(res => {
                this.getResponseData (res)
            })
    }

    getProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => {
                this.getResponseData (res)
            })
    }

    updateProfileInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        })
            .then(res => {
                this.getResponseData (res)
            })
    }

    createNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => {
                this.getResponseData (res)
            })
    }

    deleteCard(data, cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            headers: this._headers,
            method: 'DELETE',
            body: JSON.stringify(data)
        })
            .then(res => {
                this.getResponseData (res)
            })
    }

    updateProfileAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        })
            .then(res => {
                this.getResponseData (res)
            })
    }

    likeCard(data, cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: 'PUT',
            body: JSON.stringify(data)
        })
            .then(res => {
                this.getResponseData (res)
            })
    }

    dislikeCard(data, cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: 'DELETE',
            body: JSON.stringify(data)
        })
            .then(res => {
                this.getResponseData (res)
            })
    }
}
