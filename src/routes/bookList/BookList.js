import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './BookList.css';
import BookListItem from '../../components/bookListItem';
import Button from '../../components/button';

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
    fetch(`${process.env.REACT_APP_SERVICE_URL}books?offset=${this.state.offset}&limit=${this.state.limit}`)
      .then(res => res.json())
      .then(data => {
        let newState = Object.assign({}, this.state);
        newState.children = data.items
          .map(book => {
            return (
              <BookListItem key={book.id} book={book} />
            )
          });
        this.setState(newState);
      });
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    const page = Math.floor(this.state.offset / this.state.limit) + 1;
    const showPrev = page > 1
    return (
      <div className="booklistBody">
        <h2>Bækur</h2>
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
