import { GraphQLYogaError } from "@graphql-yoga/node";

const Subscription = {
  comment: {
    subscribe: (parent, { postId }, { db, pubSub }, info) => {
      const post = db.posts.find(
        (post) => post.id === postId && post.published
      );

      if (!post) {
        throw new GraphQLYogaError("Post not found");
      }

      return pubSub.subscribe(`comment ${postId}`);
    },
  },
  post: {
    subscribe: (parent, args, { pubSub }, info) => {
      return pubSub.subscribe(`post`);
    },
  },
};

export { Subscription as default };
