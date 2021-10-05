import { Popup } from './Popup.js';
import {popupImage} from "./constants";

export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._popupImageImage = this._popup.querySelector('.popup-image__image');
        this._popupImageText = this._popup.querySelector('.popup-image__text');
    };

    openPopup(image) {
        super.openPopup(popupImage);
        this._popupImageImage.src = image.link;
        this._popupImageImage.alt = image.name;
        this._popupImageText.textContent = image.name;
    }
};