module.exports = {
  Query: {
    viewer: (obj, arg, ctx) => {
      return {
        id: 1,
        displayName: () => "Test User",
      };
    },
  },
};
