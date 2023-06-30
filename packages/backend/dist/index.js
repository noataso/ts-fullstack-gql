import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import greetResolvers from "./modules/root/greet/greet.resolvers.js";
import greetTypeDefs from "./modules/root/greet/greet.typeDefs.js";
import makeTodoResolvers from "./modules/todos/make-todo/make-todo.resolvers.js";
import makeTodoTypeDefs from "./modules/todos/make-todo/make-todo.typeDefs.js";
import TodoTypeDefs from "./modules/root/models/todo.typeDefs.js";
import getTodosResolvers from "./modules/todos/get-todos/get-todos.resolvers.js";
import getTodosTypeDefs from "./modules/todos/get-todos/get-todos.typeDefs.js";
import removeTodoResolvers from "./modules/todos/remove-todo/remove-todo.resolvers.js";
import removeTodoTypeDefs from "./modules/todos/remove-todo/remove-todo.typeDefs.js";
import updateTodoResolvers from "./modules/todos/update-todo/update-todo.resolvers.js";
import updateTodoTypeDefs from "./modules/todos/update-todo/update-todo.typeDefs.js";
import getTodoResolvers from "./modules/todos/get-todo/get-todo.resolvers.js";
import getTodoTypeDefs from "./modules/todos/get-todo/get-todo.typeDefs.js";
import datetimeResolvers from "./modules/root/scalars/datetime/datetime.resolvers.js";
import datetimeTypeDefs from "./modules/root/scalars/datetime/datetime.typeDefs.js";
// import { buildSchema } from "./utils/buildSchema.js";
const prismaClient = new PrismaClient();
async function main() {
    await prismaClient.$connect();
    const PORT = process.env.PORT || 5555;
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs: mergeTypeDefs([greetTypeDefs, makeTodoTypeDefs, TodoTypeDefs, getTodosTypeDefs, removeTodoTypeDefs, updateTodoTypeDefs, getTodoTypeDefs, datetimeTypeDefs]),
        resolvers: mergeResolvers([greetResolvers, makeTodoResolvers, getTodosResolvers, removeTodoResolvers, updateTodoResolvers, getTodoResolvers, datetimeResolvers]),
        // schema: await buildSchema(),
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    app.use(cors({
        origin: ['http://localhost:5173'],
    }));
    app.use(express.json());
    app.use("/graphql", expressMiddleware(server, {
        // eslint-disable-next-line @typescript-eslint/require-await
        context: async ({ req, res }) => ({ req, res, prismaClient }),
    }));
    await new Promise((resolve) => {
        httpServer.listen({ port: PORT }, resolve);
    });
    console.log(`🚀 server is up and running at http://localhost:${PORT}`);
}
main().catch(async (err) => {
    console.error(err);
    await prismaClient.$disconnect();
    process.exit(1);
});
