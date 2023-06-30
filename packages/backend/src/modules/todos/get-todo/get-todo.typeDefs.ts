const typeDefs=`#graphql
    input GetTodoInput{
        todoId:String!
    }
    type GetTodoResponse{
        todo:Todo!
    }
    type Query{
        getTodo(getTodoInput:GetTodoInput!):GetTodoResponse!
    }
`

export default typeDefs;