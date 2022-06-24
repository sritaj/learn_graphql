const { products, categories } = require("../db");

exports.Query = {
  products: () => {
    return products;
  },
  // resolver for product based on id
  product: (parent, args, context) => {
    const productID = args.id;
    const product = products.find((product) => product.id === productID);
    if (!product) return null;
    return product;
  },
  categories: () => {
    return categories;
  },
  // resolver for category based on id
  category: (parent, args, context) => {
    const categoryID = args.id;
    const category = categories.find((category) => category.id === categoryID);
    if (!category) return null;
    return category;
  },
};
