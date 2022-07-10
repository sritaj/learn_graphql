import { Context } from "..";
import { userLoader } from "../loaders/userLoader";

interface PostParentType {
  authorID: number;
}

export const Post = {
  user: (parent: PostParentType, __: any, { prisma }: Context) => {
    return userLoader.load(parent.authorID);
    // return prisma.user.findUnique({
    //   where: {
    //     id: parent.authorID,
    //   },
    // });
  },
};
