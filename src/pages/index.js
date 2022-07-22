import './index.css';
import {Card} from '../components/Card.js';
import {Api} from '../components/Api.js';
import {
    popupImage,
    cardsContainer,
    popupDeleting,
    popupProfile,
    popupPlace,
    placeForm,
    editButton,
    popupProfileClose,
    addButton,
    popupPlaceClose,
    editForm,
    config,
    inputTypeUserInfo,
    inputTypeDescription,
    userInform,
    profileEditingPopup,
    avatarEditingForm
} from '../utils/constants.js';
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
console.log(allInfo);

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
const avatarEditingValidation = new FormValidator(config, avatarEditingForm);

profileValidation.enableValidation();
elementValidation.enableValidation();
avatarEditingValidation.enableValidation();

document.querySelector('.profile__editButton').addEventListener('click', () => {
    avatarEditingValidation.resetPopupForm();
    popupFormAvatar.open();
});

const createNewCard = (data) => {
    const card = new Card({
        data,
        handleImageClick: (name, link) => {
            popupImageBig.open(name, link);
        },
        deletePopup: (element, id) => {
            deletePopup.open(element, id)
        },
        handleLike: (cardElement, id) => {
            const liked = card.isLiked()
            if (!liked){
                api.likeCard(cardElement, id)
                    .then((data) => {
                        card.updateLikes(data, liked);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } else {
                api.dislikeCard(cardElement, id)
                    .then((data) => {
                        card.updateLikes(data, liked);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }

        },
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
        },
        popupProfile
    )
;
popupFormProfile.setEventListeners();

const popupFormAvatar = new PopupWithForm(
    {
        handleFormSubmit: (data) => {
            popupFormAvatar.loading(true);
            api.updateProfileAvatar(data)
                .then(() => {
                    popupFormAvatar.close();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    popupFormAvatar.loading(false);
                });
        }
    }, profileEditingPopup);
popupFormAvatar.setEventListeners();

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
        callbackSubmit: (data, element, id) => {
            api.deleteCard(data, id)
                .then(() => {
                    this.deleteCard();
                    this.close();
                })
                .catch((err) => {
                    console.log(err);
                })
        },
    },
    popupDeleting);
deletePopup.setEventListeners();
