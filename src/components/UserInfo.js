export class UserInfo {
    constructor({nameSelector, descriptionSelector}) {
        this._profileName = document.querySelector('.profile__name');
        this._profileDescription = document.querySelector('.profile__description');
    };

    getUserInfo() {
        const currentUserInfo = {};
        currentUserInfo.name = this._profileName.textContent;
        currentUserInfo.about = this._profileDescription.textContent;
        return currentUserInfo;
    };

    setUserInfo(currentUserInfo) {
        this._profileName.textContent = currentUserInfo.name;
        this._profileDescription.textContent = currentUserInfo.about;
    }
}
