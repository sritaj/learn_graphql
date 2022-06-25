// resolver for Category
exports.Category = {
  products: ({ id: categoryID }, args, { products }) => {
    return products.filter((product) => product.categoryID === categoryID);
  },
};
