export class FormValidator {
    constructor(config, form) {
        this._form = form;
        this._config = config;
        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputElement));
        this._buttonElement = this._form.querySelector(this._config.buttonElement);
    }
    _showInputError (inputElement, errorMessage){
        inputElement.classList.add(this._config.inputErrorClass);
        inputElement.textContent = errorMessage;
        inputElement.classList.add(this._config.errorClass);}

    _hideInputError(inputElement){
        inputElement.classList.remove(this._config.inputErrorClass);
        inputElement.classList.remove(this._config.errorClass);
        inputElement.textContent = '';
    };
    _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement);
    } else {
        this._hideInputError(inputElement);
    }};
    _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })};
    _toggleButtonState() {
            if (this._hasInvalidInput()) {
                this._buttonElement.classList.add(this._config.inactiveButtonClass);
                this._buttonElement.setAttribute("disabled", "disabled");
            } else {
                this._buttonElement.classList.remove(this._config.inactiveButtonClass);
                this._buttonElement.removeAttribute("disabled");
            }};
    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };
    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };
    resetValidation() {
        this._inputList.forEach((item) => {
            item.classList.remove(this._config.inputErrorClass)
        });
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
        this._buttonElement.setAttribute("disabled", "disabled");
        this._form.querySelectorAll('.popup__input_type_error').forEach((item) => {
            item.classList.remove(this._config.errorClass)
        });
    }
}
