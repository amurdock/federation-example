import { ApolloServer, gql } from "apollo-server"
import { buildFederatedSchema } from "@apollo/federation"

const typeDefs = gql`
  type Account @key(fields: "id") {
    id: ID!
    asset: String!
    balance: Float!
  }
  extend type User @key(fields: "id") {
    id: ID! @external
    accounts: [Account]
  }
`;

const resolvers = {
  User: {
    accounts(user: any) {
      console.log(user)
      return accounts;
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const accounts = [
  {
    id: "1",
    asset: "GBP",
    balance: 11.23,
  },
  {
    id: "2",
    asset: "BTC",
    balance: 0.001,
  },
  {
    id: "3",
    asset: "ETH",
    balance: 0.007,
  }
];
