export class UserInfo {
    constructor(nameSelector, jobSelector) {
        this._profileName = document.querySelector('.profile__name');
        this._profileDescription = document.querySelector('.profile__description');
    };

    getUserInfo() {
        const currentUserInfo = {};
        currentUserInfo.name = this._profileName.textContent;
        currentUserInfo.description = this._profileDescription.textContent;
        return currentUserInfo;
    };

    setUserInfo(nameInput, descriptionInput) {
        this._profileName.textContent = nameInput;
        this._profileDescription.textContent = descriptionInput;
    }
}
