import React from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../query/queries";
import BookDetail from "./BookDetail";

class BookList extends React.Component {
  constructor(props){
    super(props)
    this.state={
      selected:null
    }
  }
  displayBooks() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map((book) => {
        return <li key={book.id} onClick={(e)=>this.setState({selected:book.id})}>{book.name}</li>;
      });
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetail bookid={this.state.selected} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
