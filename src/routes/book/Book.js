import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import './Book.css';
import Button from '../../components/button';

/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

export default class Book extends Component {

  constructor() {
    super();
    this.state = {
      book: {},
      isHidden: true,
    }
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_SERVICE_URL}books/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          book: data,
        });
      });
  }

  onClickSave = (e) => {

  }

  toggleRating() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  render() {

    let hidden = {
      display: this.state.isHidden ? "none" : "block"
    };

    return (
      <div className="book">
        <h2>{this.state.book.title}</h2>
        <p>Eftir {this.state.book.author}</p>
        <p>ISBN13: {this.state.book.isbn13}</p>
        <p>{this.state.book.categorytitle}</p>
        <p>{this.state.book.description}</p>
        <p>{this.state.book.pagecount} síður</p>
        <p>Gefin út {this.state.book.published}</p>
        <p>Tungumál: {this.state.book.language}</p>
        <Link to={`/books/${this.state.book.id}/edit`}>Breyta bók</Link>

        <div className="rate-book" style={ hidden }>
          <label>Um bók</label>
          <input type="textarea"></input>
          <form>
            <label>Einkunn:</label>
            <select name="categoryTypes">
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </form>
          <div>
            <Button >Vista</Button>
            <Button >Hætta við</Button>
          </div>
        </div>

        <Button onClick={this.toggleRating.bind(this)}>Skrá Lestur</Button>
        <Button >Til baka</Button>
      </div>
    )
  }
}
