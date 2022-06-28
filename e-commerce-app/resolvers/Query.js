const { reviews } = require("../db");

exports.Query = {
  products: (parent, { filter }, { db }) => {
    let filteredProducts = db.products;

    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale === true) {
        filteredProducts = filteredProducts.filter((product) => {
          return product.onSale;
        });
      }
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          db.reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });
          console.log(sumRating, product.name);
          const avgProductRating = sumRating / numberOfReviews;
          return avgProductRating >= avgRating;
        });
      }
    }

    return filteredProducts;
  },
  // resolver for product based on id
  product: (parent, { id: productID }, { db }) => {
    const product = db.products.find((product) => product.id === productID);
    if (!product) return null;
    return product;
  },
  categories: (parent, args, { db }) => {
    return db.categories;
  },
  // resolver for category based on id
  category: (parent, { id: categoryID }, { db }) => {
    const category = db.categories.find(
      (category) => category.id === categoryID
    );
    if (!category) return null;
    return category;
  },
};
