import { authors } from "./data/authors.js";
import { books } from "./data/books.js";

export const resolvers = {
  Book: {
    author: (parent, args, context, info) => {
      return authors.find((author) => author.id === parent.authorId);
    },
  },
  Author: {
    books: (parent) => {
      return books.filter((book) => book.authorId === parent.id);
    },
  },
  Query: {
    authors: () => {
      return authors;
    },
    books: () => {
      return books;
    },
    author: (parent, args, context, info) => {
      return authors.find((author) => author.id === args.id);
    },
    book: (_, args) => {
      return books.find((book) => book.id === args.id);
    },
  },
  Mutation: {
    addBook: (parent, args, context, info) => {
      const newBook = { ...args, id: new Date().getTime() };

      books.push(newBook);

      return newBook;
    },
    deleteBook: (_, args) => {
      const bookIndex = books.findIndex((book) => book.id === args.bookId);
      console.log(bookIndex);

      if (bookIndex !== -1) {
        return books.splice(bookIndex, 1)[0];
      }
    },
  },
};
