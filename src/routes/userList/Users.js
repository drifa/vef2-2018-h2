import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import Button from '../../components/button';

/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

export default class Users extends Component {

  constructor() {
    super();
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_SERVICE_URL}users`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          users: data.users,
        });
      });
  }

  render () {
    return (
      <h1>Halló userS síða</h1>
    )
  }
}
