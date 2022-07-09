import { Context } from "../../index";
import validator from "validator";
import bcryptjs from "bcryptjs";

interface SignUpArgs {
  email: string;
  name: string;
  password: string;
  bio: string;
}

interface UserPayload {
  userErrors: { message: string }[];
  user: null;
}
export const authResolvers = {
  signup: async (
    _: any,
    { email, name, password, bio }: SignUpArgs,
    { prisma }: Context
  ): Promise<UserPayload> => {
    const isEmail = validator.isEmail(email);

    if (!isEmail) {
      return {
        userErrors: [{ message: "Invalid email" }],
        user: null,
      };
    }

    const isValidPassword = validator.isLength(password, {
      min: 5,
    });

    if (!isValidPassword) {
      return {
        userErrors: [{ message: "Min password length should be >=5" }],
        user: null,
      };
    }

    if (!name || !bio) {
      return {
        userErrors: [{ message: "Name or Bio field is missing" }],
        user: null,
      };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return {
      userErrors: [],
      user: null,
    };
  },
};
