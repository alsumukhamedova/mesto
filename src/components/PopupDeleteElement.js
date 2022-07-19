import {Popup} from './Popup.js';

export class PopupDeleteElement extends Popup {
    constructor({ data, callbackSubmit }, popupSelector) {
        super(popupSelector);
        this._callbackSubmit = callbackSubmit;
        this._data = data;
        this._form = this._popup.querySelector('.popup__form')
    }

    open(element, id) {
        this._element = element;
        this._element._id =  id;
        super.open();
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackSubmit (this._data, this._element, this._element._id);
        });

        super.setEventListeners();
    }
}