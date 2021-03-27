import { GraphQLServer } from "graphql-yoga";

const users = [
  {
    id: "abc_1",
    name: "John",
    email: "john@mail.com",
    age: 18,
  },
  {
    id: "abc_2",
    name: "Jane",
    email: "jane@mail.com",
    age: 19,
  },
  {
    id: "abc_3",
    name: "Adam",
    email: "adam@mail.com",
    age: 17,
  },
];

const posts = [
  {
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body:
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    published: true,
  },
  {
    id: 2,
    title: "qui est esse",
    body:
      "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
    published: true,
  },
  {
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body:
      "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
    published: false,
  },
];

// Type definition (schema)
const typeDefs = `
    type Query {
        me: User!
        post: Post
        add(numbers: [Float!]!): Float
        users(query: String): [User]!
        posts(query: String): [Post]!
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
      if (!args.numbers.length) return 0;

      return args.numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    },
    users(parent, args, ctx, info) {
      if (!args.query || !args.query === "") return users;

      const regexObj = new RegExp(args.query, "i");

      return users.filter((user) => regexObj.test(user.name));
    },
    posts(parent, args, ctx, info) {
      if (!args.query || !args.query === "") return posts;

      const regexObj = new RegExp(args.query, "i");

      return posts.filter(
        (user) => regexObj.test(user.title) || regexObj.test(user.body)
      );
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
