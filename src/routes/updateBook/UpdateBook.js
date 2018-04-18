import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import './UpdateBook.css';
import Button from '../../components/button';

/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

export default class UpdateBook extends Component {

  constructor() {
    super();
    this.state = {
      book: {},
      categories: [],
      title: '',
      author: '',
      description: '',
      category: '',
      isbn10: '',
      isbn13: '',
      published: '',
      pagecount: '',
      language: '',
    }
  }

  onUpdateAuth(auth) {
     this.props.onUpdateAuth(auth);
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_SERVICE_URL}categories`)
      .then(res => res.json())
      .then(data => {
        fetch(`${process.env.REACT_APP_SERVICE_URL}books/${this.props.match.params.id}`)
          .then(res => res.json())
          .then(fetchedBook => {
            const newState = Object.assign({}, this.state);
            newState.categories = data.items;
            newState.book = fetchedBook;
            this.setState(newState);
          });
      });
  }

  updateBook() {
    return fetch(`${process.env.REACT_APP_SERVICE_URL}books/${this.props.match.params.id}`, {
         method: 'PUT',
         headers: {
           'Content-Type':'application/json',
         },
         body: JSON.stringify({
           title: this.state.title,
           author: this.state.author,
           description: this.state.description,
           category: this.state.category,
           isbn10: this.state.isbn10,
           isbn13: this.state.isbn13,
           published: this.state.published,
           pagecount: this.state.pagecount,
           language: this.state.language,
         })
       })
       .then(res => res.json())
       .then(data => {
         console.log(JSON.stringify(data));
       })
  }

  updateBookTitle(evt) {
    let newState = Object.assign({}, this.state);
    newState.title = evt.target.value;
    this.setState(newState);
  }

  updateBookAuthor(evt) {
    let newState = Object.assign({}, this.state);
    newState.author = evt.target.value;
    this.setState(newState);
  }

  updateBookDescription(evt) {
    let newState = Object.assign({}, this.state);
    newState.description = evt.target.value;
    this.setState(newState);
  }

  updateBookCategory(evt) {
    let newState = Object.assign({}, this.state);
    newState.category = evt.target.value;
    this.setState(newState);
  }

  updateBookISBN10(evt) {
    let newState = Object.assign({}, this.state);
    newState.isbn10 = evt.target.value;
    this.setState(newState);
  }

  updateBookISBN13(evt) {
    let newState = Object.assign({}, this.state);
    newState.isbn13 = evt.target.value;
    this.setState(newState);
  }

  updateBookPublished(evt) {
    let newState = Object.assign({}, this.state);
    newState.published = evt.target.value;
    this.setState(newState);
  }

  updateBookPageCount(evt) {
    let newState = Object.assign({}, this.state);
    newState.pagecount = evt.target.value;
    this.setState(newState);
  }

  updateBookLanguage(evt) {
    let newState = Object.assign({}, this.state);
    newState.language = evt.target.value;
    this.setState(newState);
  }

  goBack() {
    window.history.back();
  }

  render() {
    const titles = this.state.categories
      .map(cat => cat.title)
      .map(title => (
        <option key={title} value={title}>{title}</option>
      ))
    return (
      <div className="updateBook">
        <h1>Breyta bók</h1>

        <table className="table-updateBook">
          <tbody>
            <tr>
              <td><label>Titill:</label></td>
              <td className="table-input-update">
                <input className="table-text" type="text" onChange={this.updateBookTitle.bind(this)} placeholder={this.state.book.title}></input>
              </td>
            </tr>
            <tr>
              <td><label>Höfundur:</label></td>
              <td className="table-input-update">
                <input className="table-text" type="text" onChange={this.updateBookAuthor.bind(this)} placeholder={this.state.book.author}></input>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="textarea-description">
          <label>Lýsing:</label>
          <textarea className="table-textarea" onChange={this.updateBookDescription.bind(this)} placeholder={this.state.book.description}></textarea>
        </div>

        <form className="form-categories">
          <label>Flokkur:</label>
          <select onChange={this.updateBookCategory.bind(this)} name="categoryTypes">
            {titles}
          </select>
        </form>

        <table className="table-updateBook">
          <tbody>
            <tr>
              <td><label>ISBN10:</label></td>
              <td className="table-input-update">
                <input className="table-text" type="text" onChange={this.updateBookISBN10.bind(this)} placeholder={this.state.book.isbn10}></input>
              </td>
            </tr>
            <tr>
              <td><label>ISBN13:</label></td>
              <td className="table-input-update">
                <input className="table-text" type="text" onChange={this.updateBookISBN13.bind(this)} placeholder={this.state.book.isbn13}></input>
              </td>
            </tr>
            <tr>
              <td><label>Útgefin:</label></td>
              <td className="table-input-update">
                <input className="table-text" type="text" onChange={this.updateBookPublished.bind(this)} placeholder={this.state.book.published}></input>
              </td>
            </tr>
            <tr>
              <td><label>Fjöldi síða:</label></td>
              <td className="table-input-update">
                <input className="table-text" type="text" onChange={this.updateBookPageCount.bind(this)} placeholder={this.state.book.pagecount}></input>
              </td>
            </tr>
            <tr>
              <td><label>Tungumál:</label></td>
              <td className="table-input-update">
                <input className="table-text" type="text" onChange={this.updateBookLanguage.bind(this)} placeholder={this.state.book.language}></input>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="updateBook-buttons">
          <Button onClick={this.updateBook.bind(this)}>Vista</Button>
        </div>
        <div className="updateBook-buttons">
          <Button onClick={this.goBack}>Til baka</Button>
        </div>
      </div>
    )
  }

}
