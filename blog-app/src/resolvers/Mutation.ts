import { Post, Prisma } from "@prisma/client";
import { Context } from "../index";

interface PostCreateArgs {
  post: {
    title: string;
    content: string;
  };
}

interface PostPayloadType {
  userErrors: { message: string }[];
  post: Post | Prisma.Prisma__PostClient<Post> | null;
}

export const Mutation = {
  postCreate: async (
    parent: any,
    { post }: PostCreateArgs,
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    const { title, content } = post;
    if (!title || !content) {
      return {
        userErrors: [
          {
            message: "You must provide a title or content to create a post",
          },
        ],
        post: null,
      };
    }

    return {
      userErrors: [],
      post: prisma.post.create({
        data: {
          title,
          content,
          authorID: 1,
        },
      }),
    };
  },
};
