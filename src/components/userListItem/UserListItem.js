import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

export default class UserListItem extends Component {

  static propTypes = {
    user: PropTypes.object,
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <strong>
          <Link to={`/users/${user.id}`}>{user.username}</Link>
        </strong>
      </div>
    );
  }

}
