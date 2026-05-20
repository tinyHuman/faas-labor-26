const { app, output } = require('@azure/functions');

const cosmosOutput = output.cosmosDB({
    databaseName: 'DemoDatabase',
    containerName: 'Items',
    connection: 'CosmosDB',
    createIfNotExists: true
})

app.http('postItemDemo', {
    methods: ['POST'],
    extraOutputs: [cosmosOutput],
    route: 'items',
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const data = await request.json();
        data.id = (Math.random() + 1).toString(36);
        context.extraOutputs.set(cosmosOutput, data);

        return {
            body: JSON.stringify(data),
            status: 201
        }
    }
});
