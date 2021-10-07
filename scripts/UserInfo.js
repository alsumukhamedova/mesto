export class UserInfo {
    constructor(nameSelector, jobSelector) {
        this._profileName = document.querySelector(nameSelector);
        this._profileDescription = document.querySelector(jobSelector);
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
