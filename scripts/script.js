const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.elements');
const profile = document.querySelector('.profile');

const addButton = profile.querySelector('.profile__add-button');
const editButton = profile.querySelector('.profile__edit-button');

const popupProfile = document.querySelector('#edit')
const popupPlace = document.querySelector('#place')
const popupImage = document.querySelector('.popup-image');

const popupProfileClose = popupProfile.querySelector('.popup__close')
const popupPlaceClose = popupPlace.querySelector('.popup__close')
const popupImageClose = popupImage.querySelector('.popup__close')

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupImageImage = document.querySelector('.popup-image__image');
const popupImageText = document.querySelector('.popup-image__text');
const profileForm = popupProfile.querySelector('.popup__form');

const editForm = document.forms.editForm;
const nameInput = editForm.elements.editFormName;
const descriptionInput = editForm.elements.editFormDescription;

const placeForm = document.forms.elementInfo;
const name = placeForm.elements.place;
const link = placeForm.elements.link;

// Создание карточек
function createCard(cardData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.element__name').textContent = cardData.name;
    cardElement.querySelector('.element__image').src = cardData.link;
    cardElement.querySelector('.element__image').alt = cardData.name;
    cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    cardElement.querySelector('.element__delete-card').addEventListener('click', function (e) {

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
function addTemplateCard() {
    initialCards.forEach((card) => renderCard(card.name, card.link))
}

addTemplateCard();

// Увеличение элемента
function handleImageClick(event) {
    popupImage.classList.add('popup_opened');
    popupImageImage.src = event.target.src;
    popupImageImage.alt = event.target.name;
    popupImageText.textContent = event.target.parentNode.textContent;
    document.addEventListener('keydown', closeEsc);
}

// Сохранение значений из popup-ов при нажатии на "сохранить"
function addInfo(evt) {
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
    openPopup(popupProfile)
}

// Popup для добавления новых элементов
function openPlacePopup() {
    openPopup(popupPlace)
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
function imageClose() {
    closePopup(popupImage)
}

// Заполнение полей формы при открытии
function fillFields() {
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
    fillFields();
    openPopup(popupProfile);
})

popupProfileClose.addEventListener('click', function () {
    closePopup(popupProfile);
    profileForm.reset();
});

addButton.addEventListener('click', function () {
    fillFields();
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
profileForm.addEventListener('submit', addInfo);
popupImageClose.addEventListener('click', imageClose);
