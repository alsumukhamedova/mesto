import {Popup} from './Popup.js';
import {profileAvatar} from "../utils/constants";

export class PopupWithForm extends Popup {
    constructor({handleFormSubmit}, popupSelector) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._popupButton = this._popup.querySelector('.popup__button');
    };

    _getInputValues = () => {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    };

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            if (evt.target.classList.contains ('popup_opened')) {
                this.loading (evt.target);
            }
            this._handleFormSubmit(this._getInputValues());
        })
        this.close();
    };
    
    setAvatar(avatar) {
        profileAvatar.src = avatar
    }

    close() {
        super.close();
        this._form.reset();
    };

    loading(isLoading) {
        if (isLoading) {
            this._popupButton.textContent = 'Сохранение...';
        } else {
            this._popupButton.textContent = 'Сохранить';
        }
    }
}