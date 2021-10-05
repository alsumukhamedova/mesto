import { Popup } from './Popup.js';
export class PopupWithForm extends Popup {
    constructor({ popup, handleFormSubmit }) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._form = document.forms.add
        this._inputList = document.querySelectorAll('.popup__input');
    }
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => (this._formValues[input.name] = input.value));
        return this._formValues;
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.closePopup();
        });
    };
}