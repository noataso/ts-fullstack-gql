const resolvers = {
    Mutation: {
        makeTodo: async (_, { makeTodoInput }, { prismaClient }, info) => {
            console.log(makeTodoInput);
            const newTodo = await prismaClient.todo.create({
                data: {
                    title: makeTodoInput.title,
                }
            });
            return {
                todo: {
                    ...newTodo,
                    updatedAt: newTodo.updatedAt,
                    createdAt: newTodo.createdAt,
                }
            };
        },
    },
};
export default resolvers;
