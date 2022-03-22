import { ApolloServer } from "apollo-server"
import { ApolloGateway } from "@apollo/gateway"

const gateway = new ApolloGateway({
  // This entire `serviceList` is optional when running in managed federation
  // mode, using Apollo Graph Manager as the source of truth.  In production,
  // using a single source of truth to compose a schema is recommended and
  // prevents composition failures at runtime using schema validation using
  // real usage-based metrics.
  serviceList: [
    { name: "user", url: "http://localhost:4001/graphql" },
    { name: "account", url: "http://localhost:4002/graphql" },
  ],

  // Experimental: Enabling this enables the query plan view in Playground.
  __exposeQueryPlanExperimental: false,
});

(async () => {
  const server = new ApolloServer({
    gateway,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
