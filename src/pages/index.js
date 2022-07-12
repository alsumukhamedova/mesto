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
import {PopupDeleteElement} from "../components/PopupDeleteElement";

let userId;

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

const createUserInfo = new UserInfo (userInform);

const api = new Api ({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
    headers: {
        authorization: '5aabf6d0-afc9-4754-bb00-4c52b48cbb27',
        'Content-Type': 'application/json'
    }
});

const allInfo = [api.getProfileInfo(), api.getInitialCards()];

Promise.all ( allInfo )
    .then(([userStats, data]) => {
        createUserInfo.setUserInfo(userStats);
        userId = userStats._id;
        createNewCard.renderItems(data);
    })
    .catch ((err) => {
        console.log (err);
    })

const deletePopup = new PopupDeleteElement(
    {
        submitSelector: (data, element, id) => {
            api.deleteCard (data, id)
                .then ((data) => {
                    element.remove();
                    deletePopup.close();
                })
                .catch ((err) => {
                    console.log (err);
                })
        }},
    '.popup-deleting');
deletePopup.setEventListeners();

