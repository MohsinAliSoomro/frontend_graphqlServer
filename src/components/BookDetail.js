import React from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../query/queries";

class BookList extends React.Component {
  displayBookDetails() {
    const { book } = this.props.data;
    if (book) {
      return (
        <div>
          <h1>Name : {book.name}</h1>
          <p>Genre : {book.genre}</p>
          <p>Author : {book.author.name}</p>
          <p>Other Books of Author </p>
          <ul>
            {book.author.books.map((book) => {
              return <li>{book.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No Book selected...</div>;
    }
  }
  render() {
    return (
      <div id="book-details">
        <p>This is book details page</p>
        <div>{this.displayBookDetails()}</div>
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookid,
      },
    };
  },
})(BookList);
