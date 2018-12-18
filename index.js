const { ApolloServer, gql } = require('apollo-server');
const { authors } = require('./assets/quotes.json');

const typeDefs = gql`
  type Quote {
    quotes: [String!]!
  }

  type Author {
    name: String!
    quotes: Quote!
  }

  type Query {
    authors: [Author!]
  }
`;

const resolvers = {
  Query: {
    authors: () => authors,
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
