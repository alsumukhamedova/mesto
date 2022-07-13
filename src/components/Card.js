export class Card {
    constructor({data, handleImageClick, deletePopup, likes, dislikes}, cardSelector, userId) {
        this._name = data.name;
        this._link = data.link;
        this._owner = data.owner;
        this._likeCounter = data.likes;
        this._id = data.id;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        this._deletePopup = deletePopup;
        this._likes = likes;
        this._dislikes = dislikes;
        this._userId = userId;
    }

    _getTemplate() {
        return document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__name').textContent = this._name;
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._likes = this._element.querySelector('.element__like');
        this._likeCounter = this._element.querySelector('.element_likeCounter');
        this._likeCounter.textContent = this._likes.length;

        if (this._getLikes()) {
            this._likes.classList.add('element__like_active');
        }

        this._deleteElementButton = this._element.querySelector('.element__delete-card')
        if (this._userId === this._owner) {
            this._deleteElementButton.classList.add('element__delete-card_visible')
        } else {
            this._deleteElementButton.classList.remove('element__delete-card_visible')
        }
        this._setEventListeners();
        return this._element;
    }

    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _likeCard() {
        const buttonLike = this._element.querySelector('.element__like');
        buttonLike.classList.toggle('element__like_active');
    }

    _setEventListeners() {

        this._likes.addEventListener ('click', () => {
            this._likes =! this._likes;
            if (!this._likes) {
                this._likes (this._element, this._id, this._likeCounter);
            } else {
                this._dislikes (this._element, this._id, this._likeCounter);
            }
        });

        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._likeCard()
        });
        this._element.querySelector('.element__delete-card').addEventListener('click', () => {
            this._deleteCard()
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleImageClick(this._link, this._name);
        });
    }

    _getLikes() {
        for (let i = 0; i < this._likes.length; i++) {
            if (this._likes[i]._userId === this._id) {
                return true;
            }
        }
    }
}
