let content = document.querySelector('.content');
let cardsContainer = content.querySelector('.elements');
let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let addButton = profile.querySelector('.profile__add-button');
let popupElementClose = document.querySelector('.popup__add-close');
let popupClose = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let popupOpened = document.querySelector('.profile__edit-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let descriptionInput = document.querySelector('.popup__input_type_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popupElementOpened = document.querySelector('.popup-element')
let cardNameInput = document.querySelector('.popup__input_type_element');
let cardLinkInput = document.querySelector('.popup__input_type_url')
let cardName = document.querySelector('.element__name');
let popupAddCardButton = document.querySelector('.popup-element__form');



// Шесть карточек «из коробки»
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


// функция создания карточек
function createCard(name, link) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.element__name').textContent = name;
    cardElement.querySelector('.element__image').src = link;
    cardElement.querySelector('.element__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
    })

    cardElement.querySelector('.element__image').addEventListener('click', handleDigitClick);

    cardsContainer.append(cardElement);
}

// функция добавления шаблонных карточек 'из коробки'
function addTemplateCard () {
    for (let i = 0; i < initialCards.length; i++) {
        const card = initialCards[i];
        const name = card.name;
        const link = card.link;
        createCard(name, link);
    }
}
// вызов функции добавления шаблонных карточек
addTemplateCard();

// объявление DOM элементов после создания карточки
let popupImageClose = document.querySelector('.popup-image__close');
let popupImageImage = document.querySelector('.popup-image__image');
let popupImage = document.querySelector('.popup-image');
let popupImageText = document.querySelector('.popup-image__text');


// Функция открытия popup'a 'редактирования имени и работы в профиле'
function openPopup() {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    popup.classList.add('popup_opened');
}
// функция закрытия popup "редактирования имени и работы в профиле" через кнопку закрытия
function closePopup() {
    popup.classList.remove('popup_opened');
    nameInput.value = '';
    descriptionInput.value = '';
}

// function openPopupElement() {
//     let popupOpened = document.querySelector('.popup-element')
//     popupOpened.classList.add('popup_opened');
// }
//
// // функция закрытия попапа 'заполнения карточек'
// function closePopupElement() {
//     let popupOpened = document.querySelector('.popup-element');
//     popupOpened.classList.remove('popup_opened');
// }

// функция удаления карточки
document.querySelector('.elements').onclick = function(e) {
    const btn = e.target.closest('.element__delete-card');
    if (!btn) {
        return;
    }
    btn.parentElement.remove();
}

// увеличение изображений
function handleDigitClick(event) {
    console.log(event);
    popupImage.classList.add('popup_opened');
    popupImageImage.src = event.target.src;
    popupImageText.textContent = event.target.parentNode.textContent;
}

// функция закрытия изображения
function imageClosed() {
    let popupOpened = document.querySelector('.popup-image');
    popupOpened.classList.remove('popup_opened');
}

// функция для сохранения значений из полей формы при нажатии кнопки "сохранить"
function addInfo(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup();
}

// слушатели событий
popupAddCardButton.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const name = document.querySelector('.popup__input_type_element');
    const link = document.querySelector('.popup__input_type_url');
    createCard(name.value, link.value);
    closePopupElement();
    name.value = '';
    link.value = '';
})

addButton.addEventListener('click', openPopupElement);
popupElementClose.addEventListener('click', closePopupElement);
formElement.addEventListener('submit', addInfo);
editButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);


popupImageClose.addEventListener('click', imageClosed);
