import { Context } from "..";

export const Query = {
  me: (_: any, __: any, { prisma, userInfo }: Context) => {
    if (!userInfo) return null;
    return prisma.user.findUnique({
      where: {
        id: userInfo.userID,
      },
    });
  },
  posts: async (_: any, __: any, { prisma }: Context) => {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
    return posts;
  },
  profile: async (
    _: any,
    { userID }: { userID: string },
    { prisma }: Context
  ) => {
    return prisma.profile.findUnique({
      where: { userID: Number(userID) },
    });
  },
};
