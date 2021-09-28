export class FormValidator {
    constructor(config, form) {
        this._form = form;
        this._config = config;
        this._inputElement = Array.from(form.querySelectorAll(config.inputElement));
        this._buttonElement = form.querySelector(config.buttonElement);
    }
    _showInputError(inputElement) {
        inputElement.classList.add(this._config.inputErrorClass);
        inputElement.closest(`#${inputElement.id}-error`).textContent = inputElement.validationMessage;
    }
    _hideInputError(inputElement){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
        inputElement.closest(`#${inputElement.id}-error`).textContent = '';
    };
    _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement);
    } else {
        this._hideInputError(inputElement);
    }};
    _hasInvalidInput(inputList) {
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
        this._setEventListeners();
    };
}
