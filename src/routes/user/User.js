import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import Button from '../../components/button';

/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

export default class User extends Component {
  render () {
    return (
      <h1>Halló user síða</h1>
    )
  }
}
