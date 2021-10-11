/**
 * Logs out queries, errors and responses to winston for log tracking
 */
module.exports = (logger) => ({
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(reqCtx) {
    // we dont need to log introspection.
    if (reqCtx.request.operationName === "IntrospectionQuery") return;
    const { request } = reqCtx;
    const { operationName = "Anonomous", http } = request || {};
    const { headers } = http || {};

    // headers is a Map so we need to use get
    const traceKey = headers.get("trace-key");
    logger.info(`Query: ${operationName}`, {
      metadata: {
        type: "REQUEST",
        query: reqCtx.request.query,
        traceKey,
      },
    });

    return {
      async willSendResponse(reqCtx) {
        logger.info(`Response: ${operationName}`, {
          metadata: {
            type: "RESPONSE",
            data: reqCtx.response.data,
            query: reqCtx.request.query,
            errors: reqCtx.response.errors,
            traceKey,
          },
        });
      },
      async didEncounterErrors(reqCtx) {
        logger.error(`Operation Failed: ${operationName}`, {
          metadata: {
            errors: reqCtx.errors,
            query: reqCtx.request.query,
            traceKey,
          },
        });
      },
    };
  },
});
