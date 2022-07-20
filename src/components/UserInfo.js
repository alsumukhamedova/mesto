export class UserInfo {
    constructor({nameValueSelector, jobValueSelector, avatarSelector}) {
        this._profileName = document.querySelector(nameValueSelector);
        this._profileDescription = document.querySelector(jobValueSelector);
        this._profileAvatar = document.querySelector(avatarSelector);
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
