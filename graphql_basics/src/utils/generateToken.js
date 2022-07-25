import JWT from "jsonwebtoken";
const JWT_AUTH_TOKEN = "MyAccessTokenForBlogProject";

const generateToken = (id) => {
  return JWT.sign({ id }, JWT_AUTH_TOKEN, {
    expiresIn: "700000",
  });
};

export { generateToken as default };
