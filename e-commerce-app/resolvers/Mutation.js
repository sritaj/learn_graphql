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
  deleteACategory: (parent, { id }, { db }) => {
    db.categories = db.categories.filter((category) => category.id != id);
    db.products = db.products.map((product) => {
      if (product.categoryID === id)
        return {
          ...product,
          categoryID: null,
        };
      else {
        return product;
      }
    });
    return true;
  },
  deleteAProduct: (parent, { id }, { db }) => {
    db.products = db.products.filter((product) => product.id != id);
    db.reviews = db.reviews.filter((review) => review.productID != id);
    return true;
  },
  deleteAReview: (parent, { id }, { db }) => {
    db.reviews = db.reviews.filter((review) => review.id != id);
    return true;
  },
  updateCategory: (parent, { id, input }, { db }) => {
    const index = db.categories.findIndex((category) => category.id === id);
    db.categories[index] = {
      ...db.categories[index],
      ...input,
    };
    return db.categories[index];
  },
  updateProduct: (parent, { id, input }, { db }) => {
    const index = db.products.findIndex((product) => product.id === id);
    db.products[index] = {
      ...db.products[index],
      ...input,
    };
    return db.products[index];
  },
};
