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
        <h1 className="header__heading"><Link to="/">Bókasafnið</Link></h1>

        {/* ætti samt frekar heima í sér component */}
        <div className="search-div">
          <div>
            <input type="text" placeholder="Bókaleit"/>
            <Button onClick={this.onClick}>Leita</Button>
          </div>
        </div>

        <div className="login">
          <div>
            <Link to="/login" className="Login-nav">Innskráning</Link>
          </div>
        </div>
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
