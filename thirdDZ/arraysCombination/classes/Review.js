export class Review {
    constructor({ userId, id, text }) {
        this.userId = userId;
        this.id = id;
        this.text = text;
        this.user = null;
    }
    setUser(user) {
        this.user = user;
    }
}
