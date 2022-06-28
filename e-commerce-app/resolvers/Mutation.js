const { v4: uuid } = require("uuid");

exports.Mutation = {
  addCategory: (parent, { input }, { categories }) => {
    const { name } = input;
    const newCategory = {
      id: uuid(),
      name,
    };
    categories.push(newCategory);

    return newCategory;
  },
  addProduct: (parent, { input }, { products }) => {
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
    products.push(newProduct);

    return newProduct;
  },
  addProductReview: (parent, { input }, { reviews }) => {
    const { date, title, comment, rating, productID } = input;

    const newReview = {
      id: uuid(),
      date,
      title,
      comment,
      rating,
      productID,
    };
    reviews.push(newReview);

    return newReview;
  },
};
