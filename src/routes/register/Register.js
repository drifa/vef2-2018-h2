import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Button from '../../components/button'

/* todo sækja actions frá ./actions */

import './Register.css';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      name: '',
    }
  }

  registerPressed() {
    console.log(this.state.username);
    console.log(this.state.password);
    console.log(this.state.name);
  }

  updateUsername(evt) {
    let newState = Object.assign({}, this.state);
    newState.username = evt.target.value;
    this.setState(newState);
  }

  updatePassword(evt) {
    let newState = Object.assign({}, this.state);
    newState.password = evt.target.value;
    this.setState(newState);
  }

  updateName(evt) {
    let newState = Object.assign({}, this.state);
    newState.name = evt.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <div>
        <h2>Nýskráning</h2>
        <form>
          <div>
            <label>Notendanafn:</label>
            <input type="text" onChange={this.updateUsername.bind(this)}/>
          </div>
          <div>
            <label>Lykilorð:</label>
            <input id="password" type="password" onChange={this.updatePassword.bind(this)}/>
          </div>
          <div>
            <label>Nafn:</label>
            <input id="name" type="text" onChange={this.updateName.bind(this)}/>
          </div>
        </form>
        <Button children={(<span>Nýskrá</span>)} onClick={this.registerPressed.bind(this)}/>
        <Link to="/login">Innskráning</Link>
      </div>
    );
  }
}

export default Register;
