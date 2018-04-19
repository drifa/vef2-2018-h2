import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Button from '../../components/button';
import BookListItem from '../../components/bookListItem';
/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

import './User.css';

export class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    const getBook = async (id) => {
     return new Promise(function(resolve, reject) {
       fetch(`${process.env.REACT_APP_SERVICE_URL}books/${id}`)
         .then(res => res.json())
         .then(data => {
           resolve(data)
         })
     });

    }

    fetch(`${process.env.REACT_APP_SERVICE_URL}users/me/read`, {
      headers: {
        "Authorization": `Bearer ${this.props.auth.token}`,
      },
    })
    .then(res => res.json())
    .then(data => {
      const bookReviewsTemp = data.items
        .map(async (review) => {
          const book = await getBook(review.id);
          const description = `Einkunn: ${review.rating}, ${review.review}`;
          return (
            <li key={review.id}>
              <Link to={`/books/${book.id}`}>{book.title}</Link>
              <p>{description}</p>
            </li>
          )

        });
      Promise.all(bookReviewsTemp)
        .then(bookReviews => {
          this.setState({
            books: bookReviews,
          });
        })
    });
  }

  render () {
    return (
      <div>
        <h1>Halló user síða</h1>
        <ul>
          {this.state.books}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(User);
