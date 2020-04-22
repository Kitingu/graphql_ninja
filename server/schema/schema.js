const graphql = require("graphql");
const _ = require("lodash");
const Book = require("./models/book");
const Author = require("./models/author");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} = graphql;

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
        // return _.find(authors, { id: parent.authorId });
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
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { authorId: parent.id });
      },
    },
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
        // return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
      },
    },
    books: {
      // get all books
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    authors:{
      type:new GraphQLList(BookType),
      resolve(parent,args){
        return authors
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
