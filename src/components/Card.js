export class Card {
    constructor({data, handleImageClick, deletePopup, handleLike}, userId, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._owner = data.owner;
        this._id = data._id;
        this._handleLike = handleLike;
        this._deletePopup = deletePopup;
        this._userId = userId;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    _getTemplate() {
        return document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__name').textContent = this._name;
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__image').alt = this._name;
        this._like = this._element.querySelector('.element__like');
        this._likeCounter = this._element.querySelector('.element_likeCounter');
        this._likeCounter.textContent = this._likes.length;

        if (this._getLikes()) {
            this._like.classList.add('element__like_active');
        }

        this._deleteElementButton = this._element.querySelector('.element__delete-card')
        if (this._userId === this._owner._id) {
            this._deleteElementButton.classList.add('element__delete-card_visible');
        } else {
            this._deleteElementButton.classList.remove('element__delete-card_visible');
        }
        this._setEventListeners();
        return this._element;
    }

    deleteCard() {
        this._element.remove();
    }

    isLiked() {
        return this._likes.some((like) => like._id === this._userId)
    }

    updateLikes(data, liked) {
        this._element.querySelector('.element_likeCounter').textContent = data.likes.length;
        if (!liked) {
            this._element.querySelector('.element__like').classList.add('element__like_active');
        } else {
            this._element.querySelector('.element__like').classList.remove('element__like_active');
        }
    }

    _setEventListeners() {

        this._like.addEventListener ('click', () => {
            this._handleLike(this._element, this._id);
        });

        this._deleteElementButton.addEventListener('click', () => {
            this._deletePopup(this._element, this._id);
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleImageClick(this._name, this._link);
        });
    }
    _getLikes() {
        for (let i = 0; i < this._likes.length; i++) {
            if (this._likes[i]._id === this._userId) {
                return true;
            }
        }
    }
}
