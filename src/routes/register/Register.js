import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
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
      errors: [],
    }
  }

  registerPressed() {
    console.log(this.state.username);
    console.log(this.state.password);
    console.log(this.state.name);

    fetch(`${process.env.REACT_APP_SERVICE_URL}register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
      })
    })
    .then(res => res.json())
    .then(data => {
      let errors = []
      if (data.errors) {
        console.log("UH OH!");
        errors = data.errors.map(error => {
          return (
            <p className="error">{error.message}</p>
          )
        });
      }

      let newState = Object.assign({}, this.state);
      newState.errors = errors;
      this.setState(newState);

    });
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
      <div className="signup">
        <div>
          <h2>Nýskráning</h2>
        </div>
        <div className="signup-errors">
          {this.state.errors ? this.state.errors : <Redirect to="/login" push />}
        </div>
        <table className="table-signup">
          <tbody>
            <tr>
              <td><label>Notendanafn:</label></td>
              <td className="table-input"><input type="text" onChange={this.updateUsername.bind(this)}/></td>
            </tr>
            <tr className="input-block">
              <td><label>Lykilorð:</label></td>
              <td className="table-input"><input id="password" type="password" onChange={this.updatePassword.bind(this)}/></td>
            </tr>
            <tr>
              <td><label>Nafn:</label></td>
              <td className="table-input"><input id="name" type="text" onChange={this.updateName.bind(this)}/></td>
            </tr>
          </tbody>
        </table>
        <div>
          <Button children={(<span>Nýskrá</span>)} onClick={this.registerPressed.bind(this)}/>
        </div>
        <div>
          <Link to="/login">Innskráning</Link>
        </div>
      </div>
    );
  }
}

export default Register;
