import { Context } from "..";

interface UserParentType {
  id: number;
}

export const User = {
  posts: (parent: UserParentType, __: any, { prisma, userInfo }: Context) => {
    const isOwnAccount = parent.id === userInfo?.userID;

    if (isOwnAccount) {
      return prisma.post.findMany({
        where: {
          authorID: parent.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      return prisma.post.findMany({
        where: {
          authorID: parent.id,
          published: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }
  },
};
