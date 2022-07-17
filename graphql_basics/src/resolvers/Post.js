const Post = {
  author: ({ author }, args, { db }, info) => {
    return db.users.find((user) => {
      return user.id === author;
    });
  },
  comments: (parent, args, { db }, info) => {
    return db.comments.filter((comment) => {
      return comment.post === parent.id;
    });
  },
};

export { Post as default };
