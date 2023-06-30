const typeDefs=`#graphql
  type Todo{
    id:String!
    title:String!
    isCompleted:Boolean!
    updatedAt:DateTime!
    createdAt:DateTime!
  }
`

export default typeDefs;

