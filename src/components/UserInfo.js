export class UserInfo {
    constructor({nameSelector, descriptionSelector, avatarSelector}) {
        this._profileName = document.querySelector('.profile__name');
        this._profileDescription = document.querySelector('.profile__description');
        this._profileAvatar = document.querySelector('.profile__avatar');
    };

    getUserInfo() {
        const currentUserInfo = {};
        currentUserInfo.name = this._profileName.textContent;
        currentUserInfo.about = this._profileDescription.textContent;
        currentUserInfo.avatar = this._profileAvatar.src;
        return currentUserInfo;
    };

    setUserInfo(currentUserInfo) {
        this._profileName.textContent = currentUserInfo.name;
        this._profileDescription.textContent = currentUserInfo.about;
        this._profileAvatar.src = currentUserInfo.avatar;
    }
}
