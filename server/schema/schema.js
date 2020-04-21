const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

// dummy data
let books = [
  { name: "the client", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "Unpealing the mask", genre: "Political", id: "2", authorId: "2" },
];
let authors = [
  { name: "joseph", age: 23, id: "1" },
  { name: "mutua", age: 32, id: "2" },
];
const BookType = new GraphQLObjectType({
  name: "Book",
  /**
   * fields function
   * returns obj
   */
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      // parent is the book and contains an author id
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    //   query for fetching a book using an id
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
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
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
