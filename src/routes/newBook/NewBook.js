import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import './NewBook.css';
import Button from '../../components/button';

/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

export class NewBook extends Component {

  constructor() {
    super();
    this.state = {
      book: {},
      categories: [],
      title: '',
      author: '',
      description: '',
      category: 1,
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
        fetch(`${process.env.REACT_APP_SERVICE_URL}books`)
          .then(res => res.json())
          .then(fetchedBook => {
            const newState = Object.assign({}, this.state);
            newState.categories = data.items;
            newState.book = fetchedBook;
            this.setState(newState);
          });
      });
  }

  newBook() {
    return fetch(`${process.env.REACT_APP_SERVICE_URL}books`, {
         method: 'POST',
         headers: {
           'Content-Type':'application/json',
           'Authorization': `Bearer ${this.props.auth.token}`,
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

  newBookTitle(evt) {
    let newState = Object.assign({}, this.state);
    newState.title = evt.target.value;
    this.setState(newState);
  }

  newBookAuthor(evt) {
    let newState = Object.assign({}, this.state);
    newState.author = evt.target.value;
    this.setState(newState);
  }

  newBookDescription(evt) {
    let newState = Object.assign({}, this.state);
    newState.description = evt.target.value;
    this.setState(newState);
  }

  newBookCategory(evt) {
    let newState = Object.assign({}, this.state);
    let categoryFound = this.state.categories
      .find(cat => {
        return cat.title === evt.target.value
      });
    console.log("CATEGORY: ");
    console.log(categoryFound);
    if (categoryFound) {
      console.log("CATEGORY: " + categoryFound.id);
      newState.category = categoryFound.id;
    }

    this.setState(newState);
  }

  newBookISBN10(evt) {
    let newState = Object.assign({}, this.state);
    newState.isbn10 = evt.target.value;
    this.setState(newState);
  }

  newBookISBN13(evt) {
    let newState = Object.assign({}, this.state);
    newState.isbn13 = evt.target.value;
    this.setState(newState);
  }

  newBookPublished(evt) {
    let newState = Object.assign({}, this.state);
    newState.published = evt.target.value;
    this.setState(newState);
  }

  newBookPageCount(evt) {
    let newState = Object.assign({}, this.state);
    newState.pagecount = evt.target.value;
    this.setState(newState);
  }

  newBookLanguage(evt) {
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
      <div className="newBook">
        <h1>Skrá nýja bók</h1>

        <table className="table-newBook">
          <tbody>
            <tr>
              <td><label>Titill:</label></td>
              <td className="table-input-new">
                <input className="table-text" type="text" onChange={this.newBookTitle.bind(this)}></input>
              </td>
            </tr>
            <tr>
              <td><label>Höfundur:</label></td>
              <td className="table-input-new">
                <input className="table-text" type="text" onChange={this.newBookAuthor.bind(this)}></input>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="textarea-description">
          <label>Lýsing:</label>
          <textarea className="table-textarea" onChange={this.newBookDescription.bind(this)}></textarea>
        </div>

        <form className="form-categories">
          <label>Flokkur:</label>
          <select onChange={this.newBookCategory.bind(this)} name="categoryTypes">
            {titles}
          </select>
        </form>

        <table className="table-newBook">
          <tbody>
            <tr>
              <td><label>ISBN10:</label></td>
              <td className="table-input-new">
                <input className="table-text" type="text" onChange={this.newBookISBN10.bind(this)}></input>
              </td>
            </tr>
            <tr>
              <td><label>ISBN13:</label></td>
              <td className="table-input-new">
                <input className="table-text" type="text" onChange={this.newBookISBN13.bind(this)}></input>
              </td>
            </tr>
            <tr>
              <td><label>Útgefin:</label></td>
              <td className="table-input-new">
                <input className="table-text" type="text" onChange={this.newBookPublished.bind(this)}></input>
              </td>
            </tr>
            <tr>
              <td><label>Fjöldi síða:</label></td>
              <td className="table-input-new">
                <input className="table-text" type="text" onChange={this.newBookPageCount.bind(this)}></input>
              </td>
            </tr>
            <tr>
              <td><label>Tungumál:</label></td>
              <td className="table-input-new">
                <input className="table-text" type="text" onChange={this.newBookLanguage.bind(this)}></input>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="newBook-buttons">
          <Button onClick={this.newBook.bind(this)}>
            Vista
          </Button>
        </div>
        <div className="newBook-buttons">
          <Button onClick={this.goBack}>Til baka</Button>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(NewBook);
