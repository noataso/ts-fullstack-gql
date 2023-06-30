import { GraphQLError } from "graphql";
const resolvers = {
    GetTodo: {
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
                    updatedAt: existingTodo.updatedAt.toISOString(),
                    createdAt: existingTodo.createdAt.toISOString(),
                }
            };
        }
    },
    GetTodos: {
        getTodos: async (_, args, { prismaClient }, info) => {
            const todos = await prismaClient.todo.findMany();
            return {
                todos: todos.map((todoItem) => ({
                    ...todoItem,
                    updatedAt: todoItem.updatedAt.toISOString(),
                    createdAt: todoItem.createdAt.toISOString(),
                }))
            };
        }
    },
    MakeTodo: {
        makeTodo: async (_, { makeTodoInput }, { prismaClient }, info) => {
            const newTodo = await prismaClient.todo.create({
                data: {
                    title: makeTodoInput.title,
                }
            });
            return {
                todo: {
                    ...newTodo,
                    updatedAt: newTodo.updatedAt.toISOString(),
                    createdAt: newTodo.createdAt.toISOString(),
                }
            };
        },
    },
    RemoveTodo: {
        removeTodo: async (_, { removeTodoInput }, { prismaClient }, info) => {
            const existingTodo = await prismaClient.todo.findUnique({
                where: {
                    id: removeTodoInput.todoId,
                }
            });
            if (!existingTodo) {
                throw new GraphQLError("Not found");
            }
            await prismaClient.todo.delete({
                where: {
                    id: existingTodo.id,
                }
            });
            return {
                todo: {
                    ...existingTodo,
                    updatedAt: existingTodo.updatedAt.toISOString(),
                    createdAt: existingTodo.createdAt.toISOString(),
                }
            };
        }
    },
    UpdateTodo: {
        updateTodo: async (_, { updateTodoInput }, { prismaClient }, info) => {
            const existingTodo = await prismaClient.todo.findUnique({
                where: {
                    id: updateTodoInput.todoId,
                }
            });
            if (!existingTodo) {
                throw new GraphQLError("Not found");
            }
            if (typeof updateTodoInput.title === "string") {
                existingTodo.title = updateTodoInput.title;
            }
            if (typeof updateTodoInput.isCompleted === "boolean") {
                existingTodo.isCompleted = updateTodoInput.isCompleted;
            }
            await prismaClient.todo.update({
                where: {
                    id: existingTodo.id,
                },
                data: {
                    title: existingTodo.title,
                    isCompleted: existingTodo.isCompleted,
                }
            });
            return {
                todo: {
                    ...existingTodo,
                    updatedAt: existingTodo.updatedAt.toISOString(),
                    createdAt: existingTodo.createdAt.toISOString(),
                }
            };
        }
    }
};
export default resolvers;
