import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Button from '../../components/button';

/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

export class User extends Component {

  constructor() {
    super();
    this.state = {
      user: {},
    }
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_SERVICE_URL}users/${this.props.match.params.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.auth.token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          user: data,
        });
      });
  }

  render () {
    let userdiv = (null);
    if (this.state.user.username) {
      userdiv = (
        <div>{this.state.user.username}</div>
      )
    }
    return (
      <div>
        <h1>Halló userS síða: {userdiv}</h1>
        {userdiv}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(User);
