const typeDefs=`#graphql
    input RemoveTodoInput {
        todoId: String!
    }

    type RemoveTodoResponse {
        todo: Todo!
    }

    type Mutation {
        removeTodo(removeTodoInput: RemoveTodoInput!): RemoveTodoResponse!
    }
`

export default typeDefs;