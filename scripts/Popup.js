export class Popup {
    constructor(popup) {
        this._popup = popup;
        this._closeEsc = this._closeEsc.bind(this)
    }
    setEventListeners() {
        this._popup.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__button-close')) {
                this.closePopup()
            }
        });
    };

    openPopup() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._closeEsc);
    };

    closePopup() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closeEsc);
    };

    _closeEsc(evt) {
        const popupOpened = document.querySelector('.popup_opened');
        if (evt.keyCode === 27 && popupOpened) {
            this.closePopup();
        }
    };
}