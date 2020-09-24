import React from "react";
import { graphql} from "react-apollo";
import {flowRight as compose} from "lodash";
import {
  getAuthorQuery,
  AddBookMutation,
  getBooksQuery,
} from "../query/queries";


class AddBook extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            genre:"",
            authorid:""
        }
    }



    displayAuthor(){
        var data = this.props.getAuthorQuery;
        if(data.loading){
            return <option disabled>loading author...</option>
        }else{
            return data.authors.map(author=>{
            return <option key={author.id} value={author.id}>{author.name}</option>
            })
        }
    }
    SubmitForm(e){
        e.preventDefault()
        this.props.AddBookMutation({
          variables: {
            name: this.state.name,
            genre: this.state.genre,
            authorid: this.state.authorid,
          },
          refetchQueries: [{ query: getBooksQuery }],
        });
    }
    render() {
    return (
      <form id="add-book" onSubmit={this.SubmitForm.bind(this)}>
        <div id="field">
          <label>Book Name:</label>
          <input
            type="text"
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <div id="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={(e) => this.setState({ genre: e.target.value })}
          />
        </div>
        <div id="field">
          <label>Author:</label>
          <select onChange={(e) => this.setState({ authorid: e.target.value })}>
            <option>Select author</option>
            {this.displayAuthor()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorQuery, { name: "getAuthorQuery" }),
  graphql(AddBookMutation, { name: "AddBookMutation" })
)(AddBook);
