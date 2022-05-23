import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImageImage = this._popup.querySelector('.popup-image__image');
        this._popupImageText = this._popup.querySelector('.popup-image__text');
    };

    open(data) {
        this._popupImageImage.src = data.link;
        this._popupImageImage.alt = data.name;
        this._popupImageText.textContent = data.name;
        super.open();
    };
}