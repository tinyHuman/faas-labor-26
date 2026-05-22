const { app, input } = require('@azure/functions');

const cosmosInput = input.cosmosDB({
    databaseName: 'TestDB',
    containerName: 'TestItems',
    connection: 'CosmosDB',
    id: '{id}',
    partitionKey: '{id}'
})

app.http('getPost', {
    methods: ['GET'],
    authLevel: 'anonymous',
    extraInputs: [cosmosInput],
    route: 'items/{id}',
    handler: async (request, context) => {
        const id = request.params.id

        const item = context.extraInputs.get(cosmosInput)

        return {
            jsonBody: item,
            status: 200
        }
    }
});
