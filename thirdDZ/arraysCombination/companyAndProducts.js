import { getProducts, getUsers, getCompanies, getReviews } from './api.js';
import { Product } from './classes/Product.js';
import { Company } from './classes/Company.js';
import { Review } from './classes/Review.js';
import { User } from './classes/User.js';

const fetchData = async () => {
    const [productsData, usersData, companiesData, reviewsData] = await Promise.all([
        getProducts(),
        getUsers(),
        getCompanies(),
        getReviews()
    ]);

    const users = usersData.map(userData => new User(userData));
    const companies = companiesData.map(companyData => new Company(companyData));
    const reviews = reviewsData.map(reviewData => {
        const review = new Review(reviewData);
        const user = users.find(user => user.id === review.userId);
        review.setUser(user);
        return review;
    });
    const products = productsData.map(productData => {
        const product = new Product(productData);
        product.reviewIds.forEach(reviewId => {
            const review = reviews.find(review => review.id === reviewId);
            if (review) {
                product.addReview(review);
            }
        });
        return product;
    });

    products.forEach(product => {
        const company = companies.find(company => company.id === product.companyId);
        if (company) {
            company.addProduct(product);
        }
    });
    return companies;
};

fetchData().then(companies => {
    console.log(companies);
}).catch(error => {console.error('Error fetching data:', error);});


