export class Product {
    constructor({ id, companyId, reviewIds, name, description }) {
        this.id = id;
        this.companyId = companyId;
        this.reviewIds = reviewIds;
        this.name = name;
        this.description = description;
        this.reviews = [];
    }
    addReview(review) {
        this.reviews.push(review);
    }
}
