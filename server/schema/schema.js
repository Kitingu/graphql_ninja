const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
let books = [
  { name: "the client", genre: "Fantasy", id: "1" },
  { name: "Unpealing the mask", genre: "Political", id: "1" },
];
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
        return _.find(books, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
