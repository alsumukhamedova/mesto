import { Card } from './Card.js';
import {popupImage, cardsContainer, profileName, nameInput, profileDescription, descriptionInput,
    popupProfile, popupPlace, profileForm, placeForm, editButton, popupProfileClose, addButton,
    popupPlaceClose, name, link, editForm, popupImageClose, popupImageImage, popupImageText, config } from './constants.js';
import { initialCards } from './initial-сards.js';
import { FormValidator } from "./FormValidator.js";
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import {PopupWithImage} from "./PopupWithImage.js";


const profileValidation = new FormValidator(config, editForm);
const elementValidation = new FormValidator(config, placeForm);

profileValidation.enableValidation();
elementValidation.enableValidation();


function createCard(name, link) {
    const card = new Card(name, link,  '#card-template', handleImageClick);
    const cardElement = card.generateCard();
    cardList.prependElement(cardElement);
}

// // Добавление готовых карточек
// function renderInitialCards() {
//     initialCards.forEach((card) => renderCard(card.name, card.link))
// }

// renderInitialCards();

const popupAddCard = new PopupWithForm({
    popup: popupPlace,
    handleFormSubmit: (card) => {
        const popupBig = new PopupWithImage(popupPlace);
        createCard(card.name, card.link, '#card-template', () => {
            popupBig.open(card);
        });
    },
});
popupAddCard.setEventListeners();

const cardList = new Section({
    items: initialCards,
    renderer: (card) => {
        const popupBig = new PopupWithImage(popupPlace);
        createCard(card.name, card.link, '#card-template', () => {
            popupBig.open(card)});
    }
}, '.elements');
cardList.renderItems();

const userInfo = new UserInfo(profileName, profileDescription)
const popupEditDescription = new PopupWithForm({
    popup:  popupProfile,
    handleFormSubmit: (item) => {
        userInfo.setUserInfo(item.username, item.description);
    }});
popupEditDescription.setEventListeners();

//  создаем класс каждому попапу
const popupAddPlace = new Popup(popupPlace);
const popupEditProfile = new Popup(popupProfile);
const popupBigImage = new Popup(popupImage);
popupBigImage.setEventListeners();

// Увеличение элемента
function handleImageClick(link, name) {
    openPopup(popupImage);
    popupImageImage.src = link;
    popupImageImage.alt = name;
    popupImageText.textContent = name;
}
//
// // Сохранение значений из popup-ов при нажатии на "сохранить"
// function submitProfileForm(evt) {
//     evt.preventDefault();
//     profileName.textContent = nameInput.value;
//     profileDescription.textContent = descriptionInput.value;
//     closeProfilePopup()
// }
//
// // открывает любой popup
// // function openPopup(popup) {
// //     popup.classList.add('popup_opened');
// //     document.addEventListener('keydown', closeEsc);
// // }
//
// // открывает редактирование профиля
// function openEditPopup() {
//     nameInput.value = profileName.textContent;
//     descriptionInput.value = profileDescription.textContent;
//     openPopup(popupProfile);
// }
//
// // Popup для добавления новых элементов
// function openPlacePopup() {
//     openPopup(popupPlace);
// }
//
// // Закрывает переданный в функцию popup
// // function closePopup(popup) {
// //     popup.classList.remove('popup_opened');
// //     document.removeEventListener('keydown', closeEsc);
// // }
//
// // Закрывает popup редактирования профиля
// function closeProfilePopup() {
//     profileForm.reset()
//     closePopup(popupProfile);
// }
//
// function closePlacePopup() {
//     placeForm.reset()
//     closePopup(popupPlace)
// }
//
// // Закрытие элемента
// function closeImagePopup() {
//     closePopup(popupImage)
// }
//
// Заполнение полей формы при открытии
function fillProfileFields() {
    const userProfile = userInfo.getUserInfo()
    nameInput.value = userProfile.userName
    descriptionInput.value = userProfile.userDescription
    // чтобы кнопка была активной при открытии попапа при валидных полях
    const event = new Event('input');
    nameInput.dispatchEvent(event);
    descriptionInput.dispatchEvent(event);
}

// // function closeEsc(evt) {
// //     const popupOpened = document.querySelector('.popup_opened');
// //     if (evt.keyCode === 27 && popupOpened) {
// //         closePopup(popupOpened);
// //     }
// // }
//
// // закрывает кликом по фону
// function closeOverlay(evt) {
//     if (evt.target.classList.contains('popup')) {
//         closePopup(evt.target.closest('.popup'));}
// }
//
editButton.addEventListener('click', function () {
    fillProfileFields();
    popupEditProfile.openPopup(popupProfile)
})
//
// popupProfileClose.addEventListener('click', function () {
//     closePopup(popupProfile);
//     profileForm.reset();
// });
//
addButton.addEventListener('click', function () {
    fillProfileFields();
    popupAddPlace.openPopup(popupPlace);
})
//
// // Закрывает popup добавления места
// popupPlaceClose.addEventListener('click', function () {
//     closePopup(popupPlace);
// });
//
// placeForm.addEventListener('submit', function (evt) {
//     evt.preventDefault();
//     renderCard(name.value, link.value);
//     closePopup(popupPlace);
//     placeForm.reset();
// })
//
// // editForm.addEventListener('submit', function (evt) {
// //     evt.preventDefault();
// //     profileName.textContent = nameInput.value;
// //     profileDescription.textContent = descriptionInput.value;
// //     closePopup(popupProfile);
// //     placeForm.reset();
// // })
//
//
//
// document.addEventListener('click', closeOverlay)
//
// addButton.addEventListener('click', openPlacePopup);
// editButton.addEventListener('click', openEditPopup);
// popupPlaceClose.addEventListener('click', closePlacePopup);
// popupProfileClose.addEventListener('click', closeProfilePopup);
// profileForm.addEventListener('submit', submitProfileForm);
// popupImageClose.addEventListener('click', closeImagePopup);
