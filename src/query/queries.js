
import { gql } from "apollo-boost";


const getAuthorQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;
const AddBookMutation=gql`
mutation($name:String!,$genre:String!,$authorid:ID!){
    addBook(name:$name,genre:$genre,authorid:$authorid){
        name 
        id
    }
}
`

const getBookQuery=gql`
    query($id:ID){
        book(id:$id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    id 
                    name
                }
            }
        }
    }
`

export { getAuthorQuery, getBooksQuery, AddBookMutation,getBookQuery };