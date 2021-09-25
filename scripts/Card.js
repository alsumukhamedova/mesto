export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }
    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.popup-image').cloneNode(true);
        return cardElement;
    }
    _createCard() {
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
    _openCard() {
        const popupImage = document.querySelector('.popup-image');
        const popupImageImage = document.querySelector('.popup-image__image');
        const popupImageText = document.querySelector('.popup-image__text');
        popupImageImage.src = this._link;
        popupImageImage.alt = this._name;
        popupImageText.textContent = this._name;
    }
    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._likeCard()
        });
        this._element.querySelector('.element__delete-card').addEventListener('click', () => {
            this._deleteCard()
        });
        this._element.querySelector('.popup-image').addEventListener('click', () => {
            this._openCard()
        });
    }
}
