import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import UserListItem from '../../components/userListItem';

import Button from '../../components/button';

/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

export class UsersList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      children: [],
      offset: 0,
      limit: 10,
    }
  }

  next() {
    console.log("NEXT");
    let newState = Object.assign({}, this.state);
    newState.offset += this.state.limit;
    this.setState(newState, this.getUsers);
  }

  prev() {
    console.log("PREV");
    let newState = Object.assign({}, this.state);
    if (newState.offset > 0) {
      newState.offset -= this.state.limit;
    }
    this.setState(newState, this.getUsers);
  }

  getUsers() {
    fetch(`${process.env.REACT_APP_SERVICE_URL}users?offset=${this.state.offset}&limit=${this.state.limit}`, {
         method: 'GET',
         headers: {
           'Content-Type':'application/json',
           'Authorization': `Bearer ${this.props.auth.token}`,
         },
      })
      .then(res => res.json())
      .then(data => {
        let newState = Object.assign({}, this.state);
        newState.children = data.items
          .map(user => {
            return (
              <UserListItem key={user.id} user={user} />
            )
          });
        this.setState(newState);
      });
  }

  componentDidMount() {
    this.getUsers();
  }

  render () {
    const page = Math.floor(this.state.offset / this.state.limit) + 1;
    const showPrev = page > 1
    return (
      <div className="userListBody">
        <Helmet defaultTitle="Notendur" titleTemplate="%s – Bókasafnið" />
        <h2>Notendur</h2>
        <ul>
          {this.state.children}
        </ul>
        <div>
          <span className="margin-right-1em">Síða {page}</span>
          {
              showPrev ? <Button className="margin-right-1em" onClick={this.prev.bind(this)} children={(<span>＜ Fyrri síða</span>)}/> : <span/>
          }

          <Button onClick={this.next.bind(this)} children={(<span>Næsta síða ＞</span>)}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(UsersList);
