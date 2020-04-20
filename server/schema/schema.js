const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  /**
   * fields function
   * returns obj
   */
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    //   query for fetching a book using an id
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLString },
      },
      /**
       *
       * @param {*} parent
       * @param {*} args
       */
      resolve(parent, args) {
        // code for getting data from db
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
