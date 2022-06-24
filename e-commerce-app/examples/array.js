const { ApolloServer, gql } = require("apollo-server");

let pokemon = ["Pikachu", "Mudkip", "Elekid"];

const typeDefs = gql`
  type Query {
    movies: [String]
    pokemon: [String]

    #Below type specifies that the array couldn't have null
    tvshows: [String!]

    #Below type specifies that neither the array could have null or the return type could be null
    anime: [String!]!
  }
`;

const resolvers = {
  Query: {
    movies: () => {
      return ["Harry Potter", "Avengers", "Pirates Of Caribbean"];
    },
    pokemon: () => {
      return pokemon;
    },
    tvshows: () => {
      return ["Friends", null, "Big Bang Theory"];
    },
    anime: () => {
      return null;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
