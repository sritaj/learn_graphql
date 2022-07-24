import JWT from "jsonwebtoken";
import { GraphQLYogaError } from "@graphql-yoga/node";

const JWT_AUTH_TOKEN = "MyAccessTokenForBlogProject";

const getUserId = (request, requireAuth = true) => {
  if (requireAuth) {
    const header = request.extensions.headers.Authentication;

    if (header) {
      const token = header.replace("Bearer ", "");
      const decoded = JWT.verify(token, JWT_AUTH_TOKEN);
      return decoded.id;
    }

    if (!header) {
      throw new GraphQLYogaError("Authentication Required!!");
    }
  }

  return null;
};

export { getUserId as default };
