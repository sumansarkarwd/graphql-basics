import { GraphQLServer } from "graphql-yoga";

// Type definition (schema)
const typeDefs = `
    type Query {
        me: User!
        post: Post
        add(numbers: [Float!]!): Float
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean
    }
`;

// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: "abc_1",
        name: "John",
        email: "john@mail.com",
        age: 18,
      };
    },
    post() {
      return {
        id: "abc_2",
        title: "Post 1",
        body: "lorem ipsum",
        published: true,
      };
    },
    add(parent, args, ctx, info) {
        if(!args.numbers.length) return 0;

        return args.numbers.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        })
    }
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
