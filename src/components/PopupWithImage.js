import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageImage = this._popup.querySelector('.popup-image__image');
        this._popupImageText = this._popup.querySelector('.popup-image__text');
        super._setEventListeners();
    };

    open(link, name) {
        this._popupImageImage.src = link;
        this._popupImageImage.alt = name;
        this._popupImageText.textContent = name;
        super.open();
    };
}