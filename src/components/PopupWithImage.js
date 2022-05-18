import {popupImageImage, popupImageText} from './constants.js';
import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    };

    open(link, name) {
        popupImageImage.src = link;
        popupImageImage.alt = name;
        popupImageText.textContent = name;
        super.open();
    };
}