import { GraphQLServer } from "graphql-yoga";

// Type definition (schema)
const typeDefs = `
    type Query {
        hello: String
        name: String
        location: String! # '!' denotes that this property cannot return null
    }
`

// Resolvers
const resolvers = {
    Query: {
        hello() {
            return "Hello world!";
        },
        name() {
            return "John";
        },
        location() {
            return "Kolkata";
        }
    }
}

// configure server
const server = new GraphQLServer({
    typeDefs,
    resolvers
})

// start server
server.start(() => {
    console.log("Server running!!!");
})