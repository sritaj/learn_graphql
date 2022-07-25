import bcryptjs from "bcrypt";
import { GraphQLYogaError } from "@graphql-yoga/node";

const hashedPassword = async (password) => {
  if (password.length < 8) {
    throw new GraphQLYogaError(
      "Password is too short!! Min 8 characters is required."
    );
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  return hashedPassword;
};

export { hashedPassword as default };
