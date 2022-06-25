exports.Query = {
  products: (parent, args, { products }) => {
    return products;
  },
  // resolver for product based on id
  product: (parent, { id: productID }, { products }) => {
    const product = products.find((product) => product.id === productID);
    if (!product) return null;
    return product;
  },
  categories: (parent, args, { categories }) => {
    return categories;
  },
  // resolver for category based on id
  category: (parent, { id: categoryID }, { categories }) => {
    const category = categories.find((category) => category.id === categoryID);
    if (!category) return null;
    return category;
  },
};
