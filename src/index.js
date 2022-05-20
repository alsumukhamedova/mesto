import '../src/pages/index.css';
import { Card } from './components/Card';
import {
    popupImage, cardsContainer, profileName, nameInput, profileDescription, descriptionInput,
    popupProfile, popupPlace, profileForm, placeForm, editButton, popupProfileClose, addButton,
    popupPlaceClose, editForm, popupImageImage, popupImageText, config, inputTypeUserInfo, inputTypeDescription
} from './components/constants';
import { initialCards } from './components/initial-сards.js';
import { FormValidator } from "./components/FormValidator.js";
import { Section } from './components/Section.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo.js';
import { PopupWithImage } from "./components/PopupWithImage.js";

const profileValidation = new FormValidator(config, editForm);
const elementValidation = new FormValidator(config, placeForm);

profileValidation.enableValidation();
elementValidation.enableValidation();

const cardList = new Section ({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item.name, item.link,  '#card-template', handleImageClick);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
}}, cardsContainer)
cardList.renderItems();


const popupImageBig = new PopupWithImage(popupImage);
// Увеличение элемента
function handleImageClick(name, link) {
    popupImageImage.alt = name;
    popupImageText.textContent = name;
    popupImageImage.src = link;
    popupImageBig.open(name, link);
}
const popupFormCard = new PopupWithForm({
    popupSelector: popupPlace,
    handleFormSubmit: (item) => {
        const card = new Card(item.place, item.link,  '#card-template', handleImageClick);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }
    });

const userInfo = new UserInfo (profileName, profileDescription);

const popupFormProfile = new PopupWithForm({
    popupSelector: popupProfile,
    handleFormSubmit: (info) => {
        userInfo.setUserInfo(info.userInfo, info.editFormDescription)
    }
    })

// Заполнение полей формы при открытии
function fillProfileFields() {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    // чтобы кнопка была активной при открытии попапа при валидных полях
    const event = new Event('input');
    nameInput.dispatchEvent(event);
    descriptionInput.dispatchEvent(event);
}

editButton.addEventListener('click', function () {
    const {userName, userDescription} = userInfo.getUserInfo();
    inputTypeUserInfo.value = userName;
    inputTypeDescription.value = userDescription;
    fillProfileFields();
    popupFormProfile.open();
})
popupProfileClose.addEventListener('click', function () {
    popupFormProfile.close();
    profileForm.reset();
});
addButton.addEventListener('click', function () {
    fillProfileFields();
    popupFormCard.open();
    elementValidation.toggleButtonState();
});

// Закрывает popup добавления места
popupPlaceClose.addEventListener('click', function () {
    popupFormCard.close()
});
