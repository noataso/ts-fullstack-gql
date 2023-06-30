import { GraphQLError } from "graphql";
import { Resolvers } from "../../../__generated__/graphql.js";
import { MyContext } from "../../../types/graphql.js";

const resolvers:Resolvers<MyContext>={
    Mutation:{
        removeTodo:async(_,{removeTodoInput},{prismaClient},info)=>{
            const existingTodo=await prismaClient.todo.findUnique({
                where:{
                    id:removeTodoInput.todoId,
                }
            })
            if(!existingTodo){
                throw new GraphQLError("Not found")
            }
            await prismaClient.todo.delete({
                where:{
                    id:existingTodo.id,
                }
            })
            return {
                todo:{
                    ...existingTodo,
                    updatedAt:existingTodo.updatedAt,
                    createdAt:existingTodo.createdAt,
                }
            }
        }
    }
}

export default resolvers;