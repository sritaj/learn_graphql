// resolver for Product
exports.Product = {
  category: ({ categoryID }, args, { categories }) => {
    return categories.find((category) => category.id === categoryID);
  },
};
