import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Button from '../../components/button';
import BookListItem from '../../components/bookListItem';
/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

import './User.css';

export class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      user: {},
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

    fetch(`${process.env.REACT_APP_SERVICE_URL}users/${this.props.match.params.id}/read`, {
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
              <div>
                <Link to={`/books/${book.id}`}><strong>{book.title}</strong></Link>
                <p>{description}</p>
              </div>
            </li>
          )

        });
      Promise.all(bookReviewsTemp)
        .then(bookReviews => {
          let newState = Object.assign({}, this.state);
          newState.books = bookReviews;
          this.setState(newState);
        })
    });


    fetch(`${process.env.REACT_APP_SERVICE_URL}users/${this.props.match.params.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.auth.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        let newState = Object.assign({}, this.state);
        newState.user = data;
        this.setState(newState);
      });
  }

  render () {
    let user = (null);
    if (this.state.user.username) {
      user = (
        <h2>{this.state.user.username}</h2>
      )
    }

    return (
      <div className="userDiv">
        {user}
        <h3>Lesnar bækur</h3>
        <ul className="list">
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
