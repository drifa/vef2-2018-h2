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

  goBack() {
    window.history.back();
  }

  render() {

    return (
      <div className="updateBook">
        <h1>Breyta bók</h1>

        <table className="table-updateBook">
          <tbody>
            <tr>
              <td><label>Titill:</label></td>
              <td className="table-input-update"><input className="table-text" type="text" placeholder={this.state.book.title}></input></td>
            </tr>
            <tr>
              <td><label>Höfundur:</label></td>
              <td className="table-input-update"><input className="table-text" type="text" placeholder={this.state.book.author}></input></td>
            </tr>
          </tbody>
        </table>

        <label>Lýsing:</label>
        <textarea className="table-textarea"placeholder={this.state.book.description}></textarea>

        <form>
          <label>Flokkur:</label>
          <select name="categoryTypes">
            <option value="">{this.state.book.categorytitle}</option>
          </select>
        </form>

        <table className="table-updateBook">
          <tbody>
            <tr>
              <td><label>ISBN10:</label></td>
              <td className="table-input-update"><input className="table-text" type="text" placeholder={this.state.book.isbn10}></input></td>
            </tr>
            <tr>
              <td><label>ISBN13:</label></td>
              <td className="table-input-update"><input className="table-text" type="text" placeholder={this.state.book.isbn13}></input></td>
            </tr>
            <tr>
              <td><label>Útgefin:</label></td>
              <td className="table-input-update"><input className="table-text" type="text" placeholder={this.state.book.published}></input></td>
            </tr>
            <tr>
              <td><label>Fjöldi síða:</label></td>
              <td className="table-input-update"><input className="table-text" type="text" placeholder={this.state.book.pagecount}></input></td>
            </tr>
            <tr>
              <td><label>Tungumál:</label></td>
              <td className="table-input-update"><input className="table-text" type="text" placeholder={this.state.book.language}></input></td>
            </tr>
          </tbody>
        </table>

        <div className="updateBook-buttons">
          <Button >Vista</Button>
        </div>
        <div className="updateBook-buttons">
          <Button onClick={this.goBack}>Til baka</Button>
        </div>
      </div>
    )
  }

}
