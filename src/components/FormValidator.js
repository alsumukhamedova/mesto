export class FormValidator {
    constructor(config, form) {
        this._config = config;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputElement));
        this._buttonElement = this._form.querySelector(this._config.buttonElement);
    }
    _showInputError (inputElement, errorMessage){
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.inputErrorClass);
        errorElement.classList.add(this._config.errorClass);
    };
    _hideInputError(inputElement){
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.classList.remove(this._config.errorClass);
        errorElement.textContent = '';
    };
    _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
        this._showInputError (inputElement, inputElement.validationMessage);
    } else {
        this._hideInputError(inputElement);
    }};
    _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });}
    toggleButtonState() {
            if (this._hasInvalidInput(this._inputList)) {
                this._buttonElement.classList.add(this._config.inactiveButtonClass);
                this._buttonElement.setAttribute("disabled", "disabled");
            } else {
                this._buttonElement.classList.remove(this._config.inactiveButtonClass);
                this._buttonElement.removeAttribute("disabled");
            }
    };
    _setEventListeners() {
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this.toggleButtonState();
                this._checkInputValidity(inputElement);
            });
        });
    };
    enableValidation() {
        this._setEventListeners();
    };
    resetPopupForm() {
        this.toggleButtonState();

        this._inputList.forEach((inputElement) => {
             this._hideInputError(inputElement);
         });
     }
}
