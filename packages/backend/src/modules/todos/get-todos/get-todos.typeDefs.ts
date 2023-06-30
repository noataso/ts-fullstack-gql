const typeDefs=`#graphql
    type GetTodosResponse{
        todos:[Todo]
    }
    type Query{
        getTodos:GetTodosResponse
    }
`

export default typeDefs;