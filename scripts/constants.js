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
