import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import './BookList.css';
import BookListItem from '../../components/bookListItem';
import Button from '../../components/button';
const qs = require('query-string');

/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

export default class BookList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      children: [],
      offset: 0,
      limit: 10,
    }
  }

  next() {
    console.log("NEXT");
    let newState = Object.assign({}, this.state);
    newState.offset += this.state.limit;
    this.setState(newState, this.getBooks);
  }

  prev() {
    console.log("PREV");
    let newState = Object.assign({}, this.state);
    if (newState.offset > 0) {
      newState.offset -= this.state.limit;
    }
    this.setState(newState, this.getBooks);
  }

  getBooks() {
    let addition = '';
    const location = this.props.location.search;

    if (location && qs.parse(location)) {

      addition = "search=" + qs.parse(location).query;
    }
    const url = `${process.env.REACT_APP_SERVICE_URL}books?${addition}&offset=${this.state.offset}&limit=${this.state.limit}`
    console.log("URL: " + url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        let newState = Object.assign({}, this.state);
        newState.children = data.items
          .map(book => {
            return (
              <BookListItem key={book.id} book={book} showOnlyTitle={false}/>
            )
          });
        this.setState(newState);
      });
  }

  componentDidMount() {
    this.getBooks();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.location || !this.props.location) {
      return
    }
    if (prevProps.location.search !== this.props.location.search) {
      this.getBooks();
    }

  }

  render() {
    let titill = "Bækur"
    console.log("PROPS");
    console.log(this.props);
    const location = this.props.location.search;
    if (location && qs.parse(location)) {
      titill = "Bókaleit: " + qs.parse(location).query;
    }
    const page = Math.floor(this.state.offset / this.state.limit) + 1;
    const showPrev = page > 1
    return (
      <div className="booklistBody">
        <Helmet defaultTitle="Bækur" titleTemplate="%s – Bókasafnið" />
        <h2>{titill}</h2>
        <ul>
          {this.state.children}
        </ul>
        <div>
          <span className="margin-right-1em">Síða {page}</span>
          {
              showPrev ? <Button className="margin-right-1em" onClick={this.prev.bind(this)} children={(<span>＜ Fyrri síða</span>)}/> : <span/>
          }

          <Button onClick={this.next.bind(this)} children={(<span>Næsta síða ＞</span>)}/>
        </div>
      </div>
    );
  }

}
