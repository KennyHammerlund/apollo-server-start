const { getSequelize } = require("@root/models/connection");
const { ApolloServer, gql } = require("apollo-server");
const { schema } = require("../schema");
const testData = require("@models/sta/datagen/testData/offerItem");
const { OFFER_ITEM_TYPE } = require("@root/graphql/resolvers/enums");
const CONTROL = testData.data[0];

test("Query OfferItem by id", async () => {
  const server = new ApolloServer({
    schema,
    dataSources: async () => {
      const rdb = await getSequelize();
      return { rdb };
    },
  });

  const QUERY = gql`
    query test_OfferItem {
      offerItem(id: 1) {
        id
        type
        materialId
        pallets
        unitOfMeasure
        quantity
        description
      }
    }
  `;
  const result = await server.executeOperation({
    query: QUERY,
  });

  expect(result.errors).toBeUndefined();
  expect(result.data.offerItem.description).toBe(CONTROL.description);
  expect(result.data.offerItem.type).toBe(OFFER_ITEM_TYPE.ACCESSORY);
  expect(result.data.offerItem.materialId).toBe(CONTROL.materialId);
  expect(result.data.offerItem.pallets).toBe(CONTROL.numPallets);
  expect(result.data.offerItem.unitOfMeasure).toBe(CONTROL.fgUnitOfMeasure);
  expect(result.data.offerItem.quantity).toBe(CONTROL.fgQuantity);
});

test("Query all OfferItems", async () => {
  const rdb = await getSequelize();
  const server = new ApolloServer({
    schema,
    dataSources: async () => {
      return { rdb };
    },
  });
  const QUERY = gql`
    query test_OfferItems {
      offerItems {
        id
        type
        materialId
        pallets
        unitOfMeasure
        quantity
        description
      }
    }
  `;
  const result = await server.executeOperation({
    query: QUERY,
  });

  const offerItemLength = await rdb.models.OfferItem.count();

  expect(result.errors).toBeUndefined();
  expect(result.data.offerItems.length).toBe(offerItemLength);
});
