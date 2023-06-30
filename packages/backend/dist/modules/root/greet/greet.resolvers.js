const resolvers = {
    Query: {
        // eslint-disable-next-line @typescript-eslint/require-await
        greet: async (_, args, context, info) => {
            return "hello";
        },
    },
};
export default resolvers;
