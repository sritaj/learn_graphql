import JWT from "jsonwebtoken";
import { JSON_SIGNATURE } from "../resolvers/key";

export const getUserFromToken = (token: string) => {
  try {
    return JWT.verify(token, JSON_SIGNATURE) as {
      userID: number;
    };
  } catch (error) {
    return null;
  }
};
