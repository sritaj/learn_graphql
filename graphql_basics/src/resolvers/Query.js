const Query = {
  users: (parent, args, { db }, info) => {
    if (!args.query) return db.users;

    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  posts: (parent, args, { db }, info) => {
    if (!args.query) return db.posts;

    return db.posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(args.query.toLowerCase()) ||
        post.body.toLowerCase().includes(args.query.toLowerCase())
      );
    });
  },
  comments: (parent, args, { db }, info) => {
    return db.comments;
  },
  me: () => {
    return {
      id: 34523,
      name: "Sritaj",
      email: "sritajp@gmail.com",
    };
  },
  post: () => {
    return {
      id: 1,
      title: "GraphQL course",
      body: "course containing A-Z of GraphQL",
      published: true,
    };
  },
};

export { Query as default };