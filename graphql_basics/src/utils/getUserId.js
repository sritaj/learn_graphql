import JWT from "jsonwebtoken";
import { GraphQLYogaError } from "@graphql-yoga/node";

const JWT_AUTH_TOKEN = "MyAccessTokenForBlogProject";

const getUserId = (request) => {
  const header = request.extensions.headers.Authorization;

  if (!header) {
    throw new GraphQLYogaError("Authentication Required!!");
  }

  const token = header.replace("Bearer ", "");

  const decoded = JWT.verify(token, JWT_AUTH_TOKEN);

  return decoded.id;
};

export { getUserId as default };
