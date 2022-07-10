import { Context } from "..";

interface ProfileParentType {
  id: number;
  bio: string;
  userID: number;
}

export const Profile = {
  user: (parent: ProfileParentType, __: any, { prisma, userInfo }: Context) => {
    return prisma.user.findUnique({
      where: {
        id: parent.userID,
      },
    });
  },
};
