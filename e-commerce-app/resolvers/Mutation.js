const { v4: uuid } = require("uuid");
const { db } = require("../db");

exports.Mutation = {
  addCategory: (parent, { input }, { db }) => {
    const { name } = input;
    const newCategory = {
      id: uuid(),
      name,
    };
    db.categories.push(newCategory);

    return newCategory;
  },
  addProduct: (parent, { input }, { db }) => {
    const { name, description, quantity, price, onSale, image } = input;
    const newProduct = {
      id: uuid(),
      name,
      description,
      quantity,
      price,
      onSale,
      image,
    };
    db.products.push(newProduct);

    return newProduct;
  },
  addProductReview: (parent, { input }, { db }) => {
    const { date, title, comment, rating, productID } = input;

    const newReview = {
      id: uuid(),
      date,
      title,
      comment,
      rating,
      productID,
    };
    db.reviews.push(newReview);

    return newReview;
  },
};
