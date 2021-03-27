import { GraphQLServer } from "graphql-yoga";

// Type definition (schema)
const typeDefs = `
    type Query {
        id: ID!
        hello: String
        name: String
        age: Int!
        admin: Boolean
        score: Float
        location: String! # '!' denotes that this property cannot return null
    }
`;

// Resolvers
const resolvers = {
  Query: {
    id() {
      return "abc_123";
    },
    age() {
      return 18;
    },
    admin() {
      return true;
    },
    score() {
      return 65.7;
    },
    hello() {
      return "Hello world!";
    },
    name() {
      return "John";
    },
    location() {
      return "Kolkata";
    },
  },
};

// configure server
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

// start server
server.start(() => {
  console.log("Server running!!!");
});
