import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import './Book.css';
import Button from '../../components/button';

/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

export class Book extends Component {

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
        let newState = Object.assign({}, this.state);
        newState.book = data
        this.setState(newState);
      });
  }

  onClickSave(e) {
    const path = 'users/me/read';
    const token = this.props.auth.token;
    const bookId = parseInt(this.props.match.params.id);
    const url = `${process.env.REACT_APP_SERVICE_URL}${path}`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookId: bookId,
        rating: parseInt(this.state.rating),
        review: this.state.review,
      }),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
  }

  toggleRating() {
    let newState = Object.assign({}, this.state);
    newState.isHidden = !this.state.isHidden;
    this.setState(newState);
  }

  selectChanged(evt) {
    let newState = Object.assign({}, this.state);
    newState.selected = evt.target.value;
    this.setState(newState);
  }

  updateReview(evt) {
    let newState = Object.assign({}, this.state);
    newState.review = evt.target.value;
    this.setState(newState);
  }

  updateRating(evt) {
    let newState = Object.assign({}, this.state);
    newState.rating = evt.target.value;
    this.setState(newState);
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
          <form>
            <input onChange={this.updateReview.bind(this)} type="textarea"></input>
            <label>Einkunn:</label>
            <select onChange={this.updateRating.bind(this)} name="categoryTypes">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </form>
          <div>
            <Button onClick={this.onClickSave.bind(this)}>Vista</Button>
            <Button >Hætta við</Button>
          </div>
        </div>

        <Button onClick={this.toggleRating.bind(this)}>Skrá Lestur</Button>
        <Button >Til baka</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(Book);
