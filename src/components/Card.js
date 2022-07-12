export class Card {
    constructor(data, userId, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._likedCards = data.likedCards;
        this._profile = data.profile;
        this._userId = data.userId;
        this._cardSelector = cardSelector;
        this._handleImageClick = data.handleImageClick;
        this._deleteCardPopup = data.deleteCardPopup;
        this._likes = data.like;
        this._dislikes = data.dislike;
        this._cardId = data.cardId;
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
        this._likeCounter.textContent = this._likedCards.length;

        if (this._getLikes()) {
            this._like.classList.add('element__like_active');
        }

        this._deleteElementButton = this._element.querySelector('.element__delete-card')
        if (this._userId === this._profile._userId) {
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

        this._like.addEventListener ('click', () => {
            this._like =! this._like;
            if (!this._like) {
                this._likes (this._element, this._userId, this._likeCounter);
            } else {
                this._dislikes (this._element, this._userId, this._likeCounter);
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
        for (let i = 0; i < this._likedCards.length; i++) {
            if (this._likedCards[i]._userId === this._userId) {
                return true;
            }
        }
    }
}
