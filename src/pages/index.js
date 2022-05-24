import './index.css';
import { Card } from '../components/Card.js';
import {
    popupImage, cardsContainer, profileName, nameInput, profileDescription, descriptionInput,
    popupProfile, popupPlace, placeForm, editButton, popupProfileClose, addButton,
    popupPlaceClose, editForm, config, inputTypeUserInfo, inputTypeDescription
} from '../utils/constants.js';
import { initialCards } from '../utils/constants.js';
import { FormValidator } from "../components/FormValidator.js";
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from "../components/PopupWithImage.js";

const profileValidation = new FormValidator(config, editForm);
const elementValidation = new FormValidator(config, placeForm);

profileValidation.enableValidation();
elementValidation.enableValidation();

const createNewCard = (data) => {
    const card = new Card({
        name: data.name, link: data.link,
        handleImageClick: () => {
            popupImageBig.open(data);
        }
    }, '#card-template');
    return card.generateCard();
}

const cardList = new Section ({
    items: initialCards,
    renderer: (item) => {
        cardList.addItem(createNewCard(item));
}}, cardsContainer)
cardList.renderItems();

const popupImageBig = new PopupWithImage(popupImage);
popupImageBig.setEventListeners();

const popupFormCard = new PopupWithForm({
    popupSelector: popupPlace,
    handleFormSubmit: (item) => {
        cardList.addItem(createNewCard({name: item.place, link: item.link}));
    }
    });
popupFormCard.setEventListeners();

const userInfo = new UserInfo (profileName, profileDescription);

const popupFormProfile = new PopupWithForm({
    popupSelector: popupProfile,
    handleFormSubmit: (info) => {
        userInfo.setUserInfo(info.userInfo, info.editFormDescription)
    }
    })
popupFormProfile.setEventListeners();

// Заполнение полей формы при открытии
function fillProfileFields() {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
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
