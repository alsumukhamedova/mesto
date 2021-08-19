let content = document.querySelector('.content');
let cardsContainer = content.querySelector('.elements');
let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let addButton = profile.querySelector('.profile__add-button');
let popupElementClose = document.querySelector('.popup__close');
let popupClose = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let popupOpened = document.querySelector('.popup-element');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let descriptionInput = document.querySelector('.popup__input_type_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let popupAddCardButton = document.querySelector('.popup-element__form');
let popupImageClose = document.querySelector('.popup-image__close');
let popupImageImage = document.querySelector('.popup-image__image');
let popupImage = document.querySelector('.popup-image');
let popupImageText = document.querySelector('.popup-image__text');

// Создание карточек
function createCard(cardData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.element__name').textContent = cardData.name;
    cardElement.querySelector('.element__image').src = cardData.link;
    cardElement.querySelector('.element__image').alt = cardData.name;
    cardElement.querySelector('.element__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
    });
    cardElement.querySelector('.element__like').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__like_active');
    })
    cardElement.querySelector('.element__delete-card').addEventListener('click',  function(e) {
        const btn = e.target.closest('.element__delete-card');
        if (!btn) {
            return;
        }
        btn.parentElement.remove();
    }
    );


    cardElement.querySelector('.element__image').addEventListener('click', handleImageClick);

    return cardElement;
}

function renderCard(name, link) {
    const cardData = {'name': name, 'link': link};
    cardsContainer.prepend(createCard(cardData));
}

// Добавление готовых карточек
function addTemplateCard () {
    initialCards.forEach((card) => renderCard(card.name, card.link))
}
addTemplateCard();

// // Popup для редактирования профиля
// function openPopup() {
//     popup.classList.add('popup_opened');
// }
// function openPopupProfile() {
//     openPopup();
//     nameInput.value = profileName.textContent;
//     descriptionInput.value = profileDescription.textContent;
// }
//
// function closePopup() {
//     popup.classList.remove('popup_opened');
// }
// function openPopupProfile() {
//     openPopup();
//     nameInput.value = profileName.textContent;
//     descriptionInput.value = profileDescription.textContent;
// }

//
// // Popup для добавления новых элементов
// function openPopupElement() {
//     popupOpened.classList.add('popup_opened');
// }
//
// function closePopupElement() {
//     popupOpened.classList.remove('popup_opened');
// }

// Удаления элемента
// document.querySelector('.elements').onclick = function(e) {
//     const btn = e.target.closest('.element__delete-card');
//     if (!btn) {
//         return;
//     }
//     btn.parentElement.remove();
// }

// Увеличение элемента
function handleImageClick(event) {
    console.log(event);
    popupImage.classList.add('popup_opened');
    popupImageImage.src = event.target.src;
    popupImageText.textContent = event.target.parentNode.textContent;
}

// // Закрытие элемента
// function imageClosed() {
//     popupImage.classList.remove('popup_opened');
// }

// Сохранение значений из попапов при нажатии на "сохранить"
function addInfo(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup();
}

popupAddCardButton.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const name = document.querySelector('.popup__input_type_element');
    const link = document.querySelector('.popup__input_type_url');
    renderCard(name.value, link.value);
    closePopupElement();
    name.value = '';
    link.value = '';
})
addButton.addEventListener('click', openPopupElement);
popupElementClose.addEventListener('click', closePopupElement);
formElement.addEventListener('submit', addInfo);
editButton.addEventListener('click', openPopupProfile);
popupClose.addEventListener('click', closePopup);
popupImageClose.addEventListener('click', imageClosed);
