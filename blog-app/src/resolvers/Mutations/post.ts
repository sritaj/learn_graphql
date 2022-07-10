import { Post, Prisma } from "@prisma/client";
import { Context } from "../../index";
import { canUserMutatePost } from "../../utils/canUserMutatePost";

interface PostArgs {
  post: {
    title?: string;
    content?: string;
  };
}

interface PostPayloadType {
  userErrors: { message: string }[];
  post: Post | Prisma.Prisma__PostClient<Post> | null;
}

export const postResolvers = {
  postCreate: async (
    parent: any,
    { post }: PostArgs,
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "You mustbe logged in to create a post",
          },
        ],
        post: null,
      };
    }

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
          authorID: userInfo.userID,
        },
      }),
    };
  },
  postUpdate: async (
    _: any,
    { post, postId }: { postId: string; post: PostArgs["post"] },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "You mustbe logged in to create a post",
          },
        ],
        post: null,
      };
    }

    const error = await canUserMutatePost({
      userID: userInfo.userID,
      postID: Number(postId),
      prisma,
    });

    if (error) {
      return error;
    }

    const { title, content } = post;

    if (!title && !content) {
      return {
        userErrors: [
          {
            message: "Need to have atleast one field for update",
          },
        ],
        post: null,
      };
    }

    const existingPost = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });

    if (!existingPost) {
      return {
        userErrors: [
          {
            message: "Post doesn't exist",
          },
        ],
        post: null,
      };
    }

    let payloadToUpdate = {
      title,
      content,
    };

    if (!title) {
      delete payloadToUpdate.title;
    }

    if (!content) {
      delete payloadToUpdate.content;
    }

    return {
      userErrors: [],
      post: prisma.post.update({
        data: {
          ...payloadToUpdate,
        },
        where: {
          id: Number(postId),
        },
      }),
    };
  },
  postDelete: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "You mustbe logged in to create a post",
          },
        ],
        post: null,
      };
    }

    const error = await canUserMutatePost({
      userID: userInfo.userID,
      postID: Number(postId),
      prisma,
    });

    if (error) {
      return error;
    }

    const postExist = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });

    if (!postExist) {
      return {
        userErrors: [
          {
            message: "Post doesn't exist",
          },
        ],
        post: null,
      };
    }

    return {
      userErrors: [],
      post: prisma.post.delete({
        where: {
          id: Number(postId),
        },
      }),
    };
  },
  postPublish: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "You mustbe logged in to create a post",
          },
        ],
        post: null,
      };
    }

    const error = await canUserMutatePost({
      userID: userInfo.userID,
      postID: Number(postId),
      prisma,
    });

    if (error) {
      return error;
    }

    return {
      userErrors: [],
      post: prisma.post.update({
        where: {
          id: Number(postId),
        },
        data: {
          published: true,
        },
      }),
    };
  },
  postUnPublish: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "You mustbe logged in to create a post",
          },
        ],
        post: null,
      };
    }

    const error = await canUserMutatePost({
      userID: userInfo.userID,
      postID: Number(postId),
      prisma,
    });

    if (error) {
      return error;
    }

    return {
      userErrors: [],
      post: prisma.post.update({
        where: {
          id: Number(postId),
        },
        data: {
          published: false,
        },
      }),
    };
  },
};
