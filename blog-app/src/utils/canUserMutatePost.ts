import { Context } from "..";

interface CanUserMutatePostParams {
  userID: number;
  postID: number;
  prisma: Context["prisma"];
}
export const canUserMutatePost = async ({
  userID,
  postID,
  prisma,
}: CanUserMutatePostParams) => {
  const user = await prisma.user.findUnique({ where: { id: userID } });

  if (!user) {
    return {
      userErrors: [
        {
          message: "User not found",
        },
      ],
      post: null,
    };
  }

  const post = await prisma.post.findUnique({ where: { id: postID } });

  if (!post) {
    return {
      userErrors: [
        {
          message: "Post not found",
        },
      ],
      post: null,
    };
  }

  if (post?.authorID !== user.id) {
    return {
      userErrors: [
        {
          message:
            "Cannot perform update operation as this post doesn't belong to current user",
        },
      ],
      post: null,
    };
  }
};
