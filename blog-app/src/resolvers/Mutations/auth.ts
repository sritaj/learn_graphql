import { Context } from "../../index";
import validator from "validator";
import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";
import { JSON_SIGNATURE } from "../key";

interface SignUpArgs {
  email: string;
  name: string;
  password: string;
  bio: string;
}

interface UserPayload {
  userErrors: { message: string }[];
  token: string | null;
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
        token: null,
      };
    }

    const isValidPassword = validator.isLength(password, {
      min: 5,
    });

    if (!isValidPassword) {
      return {
        userErrors: [{ message: "Min password length should be >=5" }],
        token: null,
      };
    }

    if (!name || !bio) {
      return {
        userErrors: [{ message: "Name or Bio field is missing" }],
        token: null,
      };
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const token = await JWT.sign(
      {
        userID: user.id,
        email: user.email,
      },
      JSON_SIGNATURE,
      {
        expiresIn: 36000000,
      }
    );

    return {
      userErrors: [],
      token,
    };
  },
};
