export class Card {
    constructor(name, link, cardSelector, handleImageClick) {
        this._name = name;
        this._link = link;
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
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._likeCard()
        });
        this._element.querySelector('.element__delete-card').addEventListener('click', () => {
            this._deleteCard()
        });
        this._element.querySelector('.element__image').addEventListener('click', this._handleImageClick);
    }
}
