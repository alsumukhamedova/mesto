let popup = document.querySelector('.popup');
let popupOpened = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let descriptionInput = document.querySelector('.popup__input_type_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');



function openPopup() {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    popup.classList.add('popup__opened');
}
function closePopup() {
    popup.classList.remove('popup__opened');
    nameInput.value = '';
    descriptionInput.value = '';
}
function addInfo(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup();
}
formElement.addEventListener('submit', addInfo);
popupOpened.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);