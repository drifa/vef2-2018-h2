import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Route, NavLink, Link, Switch, withRouter, Redirect } from 'react-router-dom'

import UserRoute from './components/user-route';
import Header from './components/header';

import Home from './routes/home';
import Login from './routes/login';
import Register from './routes/register';
import Profile from './routes/profile';
import NotFound from './routes/not-found';
import BookList from './routes/bookList';
import Book from './routes/book';
import UpdateBook from './routes/updateBook';
import User from './routes/user';
import UsersList from './routes/usersList';
import NewBook from './routes/newBook';


import { requestLogin } from './actions/auth';

/* todo fleiri routes */

import './App.css';

class App extends Component {

  render() {

    let authenticated = false;
    if (this.props.auth.user) { authenticated = true; }

    return (
      <main className="main">
        <Helmet defaultTitle="Bókasafnið" titleTemplate="%s – Bókasafnið" />

        <Header />
        <div className="main__content">
          <Switch location={this.props.location}>
            <Route path="/" exact render={() => {
              return (<Home authenticated={authenticated} />)
            }}/>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/books" exact component={BookList} />
            <Route path="/books/new" exact authenticated={authenticated} component={NewBook} />
            <Route path="/books/:id/edit" authenticated={authenticated} component={UpdateBook} />
            <Route path="/books/:id" component={Book} />
            <Route path="/users" exact authenticated={authenticated} component={UsersList} />
            <Route path="/users/:id" exact authenticated={authenticated} component={User} />
            <UserRoute path="/users/me/profile" exact authenticated={authenticated} component={Profile} />
            {/* todo fleiri route */}
            <Route component={NotFound} />
          </Switch>
        </div>

      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default withRouter(connect(mapStateToProps)(App));
