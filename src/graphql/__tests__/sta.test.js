const { getSequelize } = require("@root/models/connection");
const { ApolloServer, gql } = require("apollo-server");
const { schema } = require("../schema");
const staTestData = require("@models/sta/datagen/testData/sta");

test("Query STA by id", async () => {
  const server = new ApolloServer({
    schema,
    dataSources: async () => {
      const rdb = await getSequelize();
      return { rdb };
    },
  });
  const QUERY = gql`
    query test_STAById {
      sta(id: 1) {
        id
        number
        status
        docusignSentAt
        docusignUrl
        endDate
        startDate
        orderItems {
          product {
            id
          }
          sta {
            id
          }
        }
      }
    }
  `;
  const result = await server.executeOperation({
    query: QUERY,
  });

  // the 1st position will get id #1
  const sta = staTestData.sta[0];

  expect(result.errors).toBeUndefined();
  expect(result.data.sta.id).toBe("1");
  expect(result.data.sta.number).toBe("1");
  expect(result.data.sta.status).toBe(sta.status);
  expect(result.data.sta.docusignSentAt).toBe(sta.docusignSentAt);
  expect(result.data.sta.docusignUrl).toBe(sta.docusignUrl);
  expect(result.data.sta.endDate).toBe(sta.endDate);
  expect(result.data.sta.startDate).toBe(sta.startDate);
  expect(result.data.sta.orderItems.length).toBe(2);
});

test("Query all STAs", async () => {
  const server = new ApolloServer({
    schema,
    dataSources: async () => {
      const rdb = await getSequelize();
      return { rdb };
    },
  });
  const QUERY = gql`
    query test_STAs {
      stas {
        id
      }
    }
  `;
  const result = await server.executeOperation({
    query: QUERY,
  });

  expect(result.errors).toBeUndefined();
  expect(result.data.stas.length).toBeTruthy();
});
