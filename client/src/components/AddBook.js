import React, { Component } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { getAuthorsQuery, addBookMutation } from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: "",
    };
  }
  displayAuthors() {
    let data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled> Loading Authors..</option>;
    } else {
      return data.authors.map((author) => {
        return <option key={author.id}> {author.name}</option>;
      });
    }
  }
  submitForm(e) {
    e.preventDefault();
    this.props.addBookMutation();
  }
  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label htmlFor="book-name">Book Name:&nbsp;</label>
          <input
            type="text"
            name="book-name"
            onChange={(e) =>
              this.setState({
                name: e.target.value,
              })
            }
          />
        </div>

        <div className="field">
          <label htmlFor="genre">Genre:&nbsp;</label>
          <input
            type="text"
            name="genre"
            onChange={(e) =>
              this.setState({
                genre: e.target.value,
              })
            }
          />
        </div>

        <div className="field">
          <label htmlFor="author-name">Author</label>
          <select
            onChange={(e) =>
              this.setState({
                authorId: e.target.value,
              })
            }
            name="author-name"
          >
            <option> Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

// bind multiple queries together
export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
