const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const profilePart = profile.querySelector('.profile__part');
const profileInfo = profile.querySelector('.profile__info');
const popupClose = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');

function openPopup() {
    let nameInput = document.querySelector('.popup__input_type_name');
    let descriptionInput = document.querySelector('.popup__input_type_description');
    let popupOpened = document.querySelector('.popup');

    nameInput.value = profile.querySelector('.profile__name').textContent;
    descriptionInput.value = profile.querySelector('.profile__description').textContent;
    popupOpened.classList.add('popup_opened');
}
function closePopup() {
    let nameInput = document.querySelector('.popup__input_type_name');
    let descriptionInput = document.querySelector('.popup__input_type_description');
    let popupOpened = document.querySelector('.popup');
    popupOpened.classList.remove('popup_opened');
    nameInput.value = '';
    descriptionInput.value = '';
}
function addInfo(evt) {
    evt.preventDefault();
    let nameInput = document.querySelector('.popup__input_type_name');
    let descriptionInput = document.querySelector('.popup__input_type_description');

    profile.querySelector('.profile__name').textContent = nameInput.value;
    profile.querySelector('.profile__description').textContent = descriptionInput.value;
    closePopup();
}
formElement.addEventListener('submit', addInfo);
editButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);