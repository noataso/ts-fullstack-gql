import { GraphQLError } from "graphql";
const resolvers = {
    Query: {
        getTodo: async (_, { getTodoInput }, { prismaClient }, info) => {
            const existingTodo = await prismaClient.todo.findUnique({
                where: {
                    id: getTodoInput.todoId,
                }
            });
            if (!existingTodo) {
                throw new GraphQLError("Not found");
            }
            return {
                todo: {
                    ...existingTodo,
                    updatedAt: existingTodo.updatedAt,
                    createdAt: existingTodo.createdAt,
                }
            };
        }
    }
};
export default resolvers;
