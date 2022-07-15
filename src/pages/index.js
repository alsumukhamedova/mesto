import './index.css';
import {Card} from '../components/Card.js';
import {Api} from '../components/Api.js';
import {
    popupImage, cardsContainer, nameInput, descriptionInput,
    popupProfile, popupPlace, placeForm, editButton, popupProfileClose, addButton,
    popupPlaceClose, editForm, config, inputTypeUserInfo, inputTypeDescription, userInform
} from '../utils/constants.js';
// import {initialCards} from "../utils/constants.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupDeleteElement} from "../components/PopupDeleteElement";

let userId;
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
    headers: {
        authorization: '5aabf6d0-afc9-4754-bb00-4c52b48cbb27',
        'Content-Type': 'application/json'
    }
});
const allInfo = [api.getProfileInfo(), api.getInitialCards()];

Promise.all(allInfo)
    .then(([userStats, data]) => {
        newUserInfo.setUserInfo(userStats);
        userId = userStats._id;
        cardList.renderItems(data);
    })
    .catch((err) => {
        console.log(err);
    })

const profileValidation = new FormValidator(config, editForm);
const elementValidation = new FormValidator(config, placeForm);

profileValidation.enableValidation();
elementValidation.enableValidation();

const createNewCard = (data) => {
    const card = new Card({
        data,
        handleImageClick: (name, link) => {
            popupImageBig.open(name, link);
        },
        deletePopup: (element, id) => {
            deletePopup.open(element, id)
        },
        likeCard: (cardElement, id) => {
            api.likeCard(cardElement, id)
                .then((data) => {
                    cardElement.querySelector('.element__like').classList.add('element__like_active');
                    cardElement.querySelector('.element_likeCounter').textContent = data.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        dislikeCard: (cardElement, id) => {
            api.dislikeCard(cardElement, id)
                .then((data) => {
                    cardElement.querySelector('.element__like').classList.remove('element__like_active');
                    cardElement.querySelector('.element_likeCounter').textContent = data.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, userId, '#card-template');
    return card.generateCard();
}

const cardList = new Section({
    renderer: (item) => {
        cardList.addItem(createNewCard(item));
    }
}, cardsContainer)

const popupImageBig = new PopupWithImage(popupImage);
popupImageBig.setEventListeners();


const popupFormCard = new PopupWithForm(
    {
        handleFormSubmit: (data) => {
            popupFormCard.loading(true);
            api.createNewCard(data)
                .then((data) => {
                    cardList.addItem(createNewCard(data));
                    popupFormCard.close();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    popupFormCard.loading(false);
                });
        }
    }, popupPlace);
popupFormCard.setEventListeners();

const popupFormProfile = new PopupWithForm(
        {
            handleFormSubmit: (data) => {
                popupFormProfile.loading(true);
                api.updateProfileInfo(data)
                    .then((data) => {
                        newUserInfo.setUserInfo(data);
                        popupFormProfile.close();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => {
                        popupFormProfile.loading(false);
                    });
            }
        }
        ,
        popupProfile
    )
;
popupFormProfile.setEventListeners();


editButton.addEventListener('click', function () {
    const profileData = newUserInfo.getUserInfo();
    inputTypeUserInfo.value = profileData.name;
    inputTypeDescription.value = profileData.about;
    popupFormProfile.open();
})
popupProfileClose.addEventListener('click', function () {
    popupFormProfile.close();
});
addButton.addEventListener('click', function () {
    popupFormCard.open();
    elementValidation.toggleButtonState();
});

// Закрывает popup добавления места
popupPlaceClose.addEventListener('click', function () {
    popupFormCard.close()
});

const newUserInfo = new UserInfo(userInform);

const deletePopup = new PopupDeleteElement(
    {
        submitSelector: (data, element, id) => {
            api.deleteCard(data, id)
                .then((data) => {
                    element.remove();
                    deletePopup.close();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    },
    '.popup-deleting');
deletePopup.setEventListeners();

