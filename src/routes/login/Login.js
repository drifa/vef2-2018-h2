import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Button from '../../components/button';

/* todo sækja actions frá ./actions */

import './Login.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: [],
    }
  }

  loginPressed() {
    fetch(`${process.env.REACT_APP_SERVICE_URL}login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then(res => res.json())
    .then(data => {
      let errors = [];
      let token = null;
      if (data.errors) {
        errors = data.errors;
      } else {
        token = data.token;
      }
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

  render() {
    return (
<<<<<<< HEAD
      <div>
        <h2>Innskráning</h2>
        <form>
          <div className="input-block">
            <label>Notendanafn:</label>
            <input type="text" onChange={this.updateUsername.bind(this)}/>
          </div>
          <div className="input-block">
            <label>Lykilorð:</label>
            <input id="password" type="password" onChange={this.updatePassword.bind(this)}/>
          </div>
        </form>
        <Button children={(<span>Innskrá</span>)} onClick={this.loginPressed.bind(this)}/>
        <Link to="/register">Nýskráning</Link>
=======
      <div className="login">
        <div>
          <h2>Innskráning</h2>
        </div>
        <table className="table-login">
          <tbody>
            <tr>
              <td><label>Notendanafn:</label></td>
              <td className="table-input"><input type="text" onChange={this.updateUsername.bind(this)}/></td>
            </tr>
            <tr>
              <td><label>Lykilorð:</label></td>
              <td className="table-input"><input id="password" type="password" onChange={this.updatePassword.bind(this)}/></td>
            </tr>
          </tbody>
        </table>
        <div>
          <Button children={(<span>Innskrá</span>)} onClick={this.loginPressed.bind(this)}/>
        </div>
        <div>
          <Link to="/register">Nýskráning</Link>
        </div>
>>>>>>> aa07e12328c9f883d521dc75e8417deb2dbad2cc
      </div>
    );
  }
}

/* todo tengja við redux */

export default Login;
