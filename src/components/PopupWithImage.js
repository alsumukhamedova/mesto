import {popupImage, popupImageText} from './constants.js';
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    };

    open(link, name) {
        popupImage.src = link;
        popupImage.alt = name;
        popupImageText.textContent = name;
        super.open();
    };
}