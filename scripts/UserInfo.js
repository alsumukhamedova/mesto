export class UserInfo {
    constructor(name, description) {
        this._name = name;
        this._description = description;
    };

    getUserInfo() {
        return {
            userName: this._name.textContent,
            userDescription: this._description.textContent,
        };
    };

    setUserInfo(username, description) {
        this._name.textContent = username;
        this._description.textContent = description;
    };
}