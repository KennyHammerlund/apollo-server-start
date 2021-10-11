const { getSequelize } = require("@root/models/connection");
const { ApolloServer, gql } = require("apollo-server");
const { schema } = require("../schema");

test("Query Customer by id", async () => {
  const server = new ApolloServer({
    schema,
    dataSources: async () => {
      const rdb = await getSequelize();
      return { rdb };
    },
  });
  const NODE_QUERY = gql`
    query test_nodeVersion {
      customerOrganization(id: 1) {
        id
        name
      }
    }
  `;
  const result = await server.executeOperation({
    query: NODE_QUERY,
  });

  expect(result.errors).toBeUndefined();
  expect(result.data.customerOrganization.name).toBe("AMAZON INC");
});
