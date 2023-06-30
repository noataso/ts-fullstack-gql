const resolvers = {
    Query: {
        getTodos: async (_, args, { prismaClient }, info) => {
            const todos = await prismaClient.todo.findMany();
            return {
                todos: todos.map((todoItem) => ({
                    ...todoItem,
                    updatedAt: todoItem.updatedAt,
                    createdAt: todoItem.createdAt,
                }))
            };
        }
    }
};
export default resolvers;
