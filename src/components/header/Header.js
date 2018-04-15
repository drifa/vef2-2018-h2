import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import Button from '../button';

import { requestLogout } from '../../actions/auth';

import './Header.css';

class Header extends Component {

  onClick = (e) => {
    console.log('leita');
  }

  onUpdateAuth() {
    this.props.onUpdateAuth({});
  }

  render() {

    let authDiv = (
      <li className="login-nav">
        <Link to="/login">Innskráning</Link>
      </li>
    );
    if (this.props.auth.user) {
      authDiv = (
        <li>
          {this.props.auth.user.username}
          <Button onClick={this.onUpdateAuth.bind(this)} children={(<span>Útskrá</span>)}/>
        </li>
      )
    }

    return (
      <header className="header">
        <ul>
          <li className="heading-nav">
            <h1 className="header__heading"><Link to="/" className="home-link">Bókasafnið</Link></h1>
          </li>
          <li className="search-nav">
            <div>
              <input type="text" placeholder="Bókaleit"/>
              <Button onClick={this.onClick}>Leita</Button>
            </div>
          </li>
          {authDiv}
        </ul>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapActionsToProps = {
  onUpdateAuth: requestLogout,
}

export default connect(mapStateToProps, mapActionsToProps)(Header);
