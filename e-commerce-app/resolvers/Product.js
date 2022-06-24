const { categories } = require("../db");

// resolver for Product
exports.Product = {
  category: (parent, args, context) => {
    const categoryID = parent.categoryID;
    return categories.find((category) => category.id === categoryID);
  },
};
