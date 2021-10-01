import { Card } from './Card.js';
import {popupImage, cardsContainer, profileName, nameInput, profileDescription, descriptionInput,
    popupProfile, popupPlace, profileForm, placeForm, editButton, popupProfileClose, addButton,
    popupPlaceClose, name, link, editForm, popupImageClose, popupImageImage, popupImageText, config } from './constants.js';
import { initialCards } from './initial-сards.js';
import { FormValidator } from "./FormValidator.js";

function setResetValidator(config, form) {
    const newValidator = new FormValidator(config, form);
    newValidator.resetValidation();
    newValidator.enableValidation();
}

function enableProfileValidation() {
    setResetValidator(config, editForm);
}
function enableElementValidation() {
    setResetValidator(config, placeForm);
}


function renderCard(name, link) {
    const card = new Card(name, link,  '#card-template', handleImageClick);
    cardsContainer.prepend(card.generateCard());
}

// Добавление готовых карточек
function renderInitialCards() {
    initialCards.forEach((card) => renderCard(card.name, card.link))
}

renderInitialCards();

// Увеличение элемента
function handleImageClick(link, name) {
    openPopup(popupImage);
    popupImageImage.src = link;
    popupImageImage.alt = name;
    popupImageText.textContent = name;
}

// Сохранение значений из popup-ов при нажатии на "сохранить"
function submitProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeProfilePopup()
}

// открывает любой popup
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeEsc);
}

// открывает редактирование профиля
function openEditPopup() {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openPopup(popupProfile);
    enableProfileValidation();
}

// Popup для добавления новых элементов
function openPlacePopup() {
    openPopup(popupPlace);
    enableElementValidation();
}

// Закрывает переданный в функцию popup
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEsc);
}

// Закрывает popup редактирования профиля
function closeProfilePopup() {
    profileForm.reset()
    closePopup(popupProfile);
}

function closePlacePopup() {
    placeForm.reset()
    closePopup(popupPlace)
}

// Закрытие элемента
function closeImagePopup() {
    closePopup(popupImage)
}

// Заполнение полей формы при открытии
function fillProfileFields() {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    // чтобы кнопка была активной при открытии попапа при валидных полях
    const event = new Event('input');
    nameInput.dispatchEvent(event);
    descriptionInput.dispatchEvent(event);
}

function closeEsc(evt) {
    const popupOpened = document.querySelector('.popup_opened');
    if (evt.keyCode === 27 && popupOpened) {
        closePopup(popupOpened);
    }
}

// закрывает кликом по фону
function closeOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target.closest('.popup'));}
}

editButton.addEventListener('click', function () {
    fillProfileFields();
    openPopup(popupProfile);
})

popupProfileClose.addEventListener('click', function () {
    closePopup(popupProfile);
    profileForm.reset();
});

addButton.addEventListener('click', function () {
    fillProfileFields();
    openPopup(popupPlace);
})

// Закрывает popup добавления места
popupPlaceClose.addEventListener('click', function () {
    closePopup(popupPlace);
});

placeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    renderCard(name.value, link.value);
    closePopup(popupPlace);
    placeForm.reset();
})

editForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup(popupProfile);
    placeForm.reset();
})

document.addEventListener('click', closeOverlay)

addButton.addEventListener('click', openPlacePopup);
editButton.addEventListener('click', openEditPopup);
popupPlaceClose.addEventListener('click', closePlacePopup);
popupProfileClose.addEventListener('click', closeProfilePopup);
profileForm.addEventListener('submit', submitProfileForm);
popupImageClose.addEventListener('click', closeImagePopup);
