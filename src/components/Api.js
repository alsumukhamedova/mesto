class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-/cards', {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getProfileInfo() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-/users/me', {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    updateProfileInfo(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-/users/me', {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    createNewCard(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-/cards', {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    deleteCard(data, cardId) {
        return fetch('', {
            headers: this._headers,
            method: 'DELETE',
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    updateProfileAvatar(data) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-/users/me/avatar', {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    likeCard(data, cardId) {
        return fetch('', {
            headers: this._headers,
            method: 'PUT',
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    dislikeCard(data, cardId) {
        return fetch('', {
            headers: this._headers,
            method: 'DELETE',
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
    headers: {
        authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
        'Content-Type': 'application/json'
    }
});