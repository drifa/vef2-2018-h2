import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link, Redirect } from 'react-router-dom';

import Button from '../button';

import { requestLogout } from '../../actions/auth';

import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false }
  }

  onClick(e) {
    console.log("click");
    let newState = Object.assign({}, this.state);
    newState.redirect = (<Redirect to={`/books?query=${this.state.query}`} />)
    this.setState(newState, () => {
      newState.redirect = (null);
      this.setState(newState);
    });
  }

  onUpdateAuth() {
    this.props.onUpdateAuth({});
    this.setState({ redirect: true }, () => {
      this.setState({ redirect: false });
    });
  }

  updateQuery(evt) {
    let newState = Object.assign({}, this.state);
    newState.query = evt.target.value;
    this.setState(newState);
  }

  render() {

    let redirect = (null);
    if (this.state.redirect) {
      redirect = (<Redirect to="/"/>);
    }

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
        {redirect}
        <ul>
          <li className="heading-nav">
            <h1 className="header__heading"><Link to="/" className="home-link">Bókasafnið</Link></h1>
          </li>
          <li className="search-nav">
            <div>
              <input type="text" placeholder="Bókaleit" onChange={this.updateQuery.bind(this)}/>
              <Button onClick={this.onClick.bind(this)}>Leita</Button>
            </div>
          </li>
          <Link to="/users/me">{authDiv}</Link>
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
