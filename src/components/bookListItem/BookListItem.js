import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './BookListItem.css';

/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

export default class BookListItem extends Component {

  static propTypes = {
    book: PropTypes.object,
  }

  render() {
    const { book } = this.props;

    let published = ""
    if (typeof book.published !== "undefined" && book.published.length > 0) {
      published = `, gefin út ${book.published}`
    }

    let by = '';
    if (this.props.showOnlyTitle === false) {
      by = `Eftir ${book.author}${published}`
    }

    return (
      <div>
        <strong>
          <Link to={`/books/${book.id}`}>{book.title}</Link>
        </strong>
        <p>
          {by}
        </p>
      </div>
    );
  }

}
