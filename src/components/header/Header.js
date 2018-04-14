import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import Button from '../button';

import './Header.css';

class Header extends Component {

  onClick = (e) => {
    console.log('leita');
  }

  render() {
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
          <li className="login-nav">
            <Link to="/login">Innskráning</Link>
          </li>
        </ul>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(Header);
