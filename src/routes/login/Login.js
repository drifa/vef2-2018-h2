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
    }
  }

  loginPressed() {
    console.log(this.state.username);
    console.log(this.state.password);
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
      </div>
    );
  }
}

/* todo tengja við redux */

export default Login;
