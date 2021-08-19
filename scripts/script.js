const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.elements');
const profile = document.querySelector('.profile');

const name = document.querySelector('.popup__input_type_element');
const link = document.querySelector('.popup__input_type_url');

const addButton = profile.querySelector('.profile__add-button');
const editButton = profile.querySelector('.profile__edit-button');

const popupProfile = document.querySelector('#edit')
const popupPlace = document.querySelector('#place')
const popupImage = document.querySelector('.popup-image');

const popupProfileClose = popupProfile.querySelector('.popup__close')
const popupPlaceClose = popupPlace.querySelector('.popup__close')
const popupImageClose = popupImage.querySelector('.popup__close')

const profileForm = popupProfile.querySelector('.popup__form');
const placeForm = popupPlace.querySelector('.popup__form');

const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupImageImage = document.querySelector('.popup-image__image');
const popupImageText = document.querySelector('.popup-image__text');


// Создание карточек
function createCard(cardData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.element__name').textContent = cardData.name;
    cardElement.querySelector('.element__image').src = cardData.link;
    cardElement.querySelector('.element__image').alt = cardData.name;
    cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    })
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

// открывает любой popup
function openPopup(popup) {
    popup.classList.add('popup_opened');
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
}

// Закрывает popup редактирования профиля
function closeProfilePopup() {
    profileForm.reset()
    closePopup(popupProfile);
}

// Закрывает popup добавления места
function closePlacePopup() {
    placeForm.reset()
    closePopup(popupPlace)
}

// Увеличение элемента
function handleImageClick(event) {
    console.log(event);
    popupImage.classList.add('popup_opened');
    popupImageImage.src = event.target.src;
    popupImageImage.alt = event.target.name;
    popupImageText.textContent = event.target.parentNode.textContent;
}

// Закрытие элемента
function closeImage() {
    closePopup(popupImage)
}

// Сохранение значений из popup-ов при нажатии на "сохранить"
function addInfo(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeProfilePopup()
}

placeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    renderCard(name.value, link.value);
    closePlacePopup();
})

addButton.addEventListener('click', openPlacePopup);
editButton.addEventListener('click', openEditPopup);
popupPlaceClose.addEventListener('click', closePlacePopup);
popupProfileClose.addEventListener('click', closeProfilePopup);
profileForm.addEventListener('submit', addInfo);
popupImageClose.addEventListener('click', closeImage);