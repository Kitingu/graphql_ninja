import React, { Component } from "react";
import { graphql } from "react-apollo";
import {getAuthorsQuery} from "../queries/queries"

class AddBook extends Component {

    displayAuthors(){
        let data = this.props.data;
        if (data.loading) {
          return <option disabled> Loading Authors..</option>;
        } else {
          return data.authors.map((author) => {
            return <option key={author.id}> {author.name}</option>;
          });
        }
    }
  render() {

    return (
      <form id="add-book">
        <div className="field">
          <label htmlFor="book-name">Book Name:&nbsp;</label>
          <input type="text" name="book-name" />
        </div>

        <div className="field">
          <label htmlFor="genre">Genre:&nbsp;</label>
          <input type="text" name="genre" />
        </div>

        <div className="field">
          <label htmlFor="author-name">Author</label>
          <select name="author-name">
              <option> Select Author</option>
              {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);
