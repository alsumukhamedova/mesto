export class UserInfo {
    constructor({nameSelector, descriptionSelector, avatarSelector}) {
        this._profileName = document.querySelector('.profile__name');
        this._profileDescription = document.querySelector('.profile__description');
        this._profileAvatar = document.querySelector('.profile__pic');
    };

    getUserInfo() {
        const data = {}
        data.name = this._profileName.textContent;
        data.about = this._profileDescription.textContent;
        data.avatar = this._profileAvatar.src;
        return data;
    };

    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileDescription.textContent = data.about;
        this._profileAvatar.src = data.avatar;
    }
}
