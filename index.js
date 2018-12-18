const { ApolloServer, gql } = require('apollo-server');
const { authors } = require('./assets/quotes.json');

const typeDefs = gql`
  type Quote {
    quote: String!
  }

  type Author {
    name: String!
    quotes(search: String): [Quote!]!
  }

  type Query {
    authors(name: String): [Author!]
  }
`;

const contains = (fullText, fragment) =>
  (fullText || '').toLowerCase().indexOf((fragment || '').toLowerCase()) >= 0;

const resolvers = {
  Query: {
    authors: (_, { name }) => !name
      ? authors
      : authors.filter(author => contains(author.name, name)),
  },
  Author: {
    quotes: (author, { search }) => !search
      ? author.quotes
      : author.quotes.filter(({ quote }) => contains(quote, search)),
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
