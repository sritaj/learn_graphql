const { products } = require("../db");

// resolver for Category
exports.Category = {
  products: (parent, args, context) => {
    const categoryID = parent.id;
    return products.filter((product) => product.categoryID === categoryID);
  },
};
