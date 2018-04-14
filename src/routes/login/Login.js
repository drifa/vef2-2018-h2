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
      <div className="login">
        <div>
          <h2>Innskráning</h2>
        </div>
        <table className="table-login">
          <tr>
            <td><label>Notendanafn:</label></td>
            <td className="table-input"><input type="text" onChange={this.updateUsername.bind(this)}/></td>
          </tr>
          <tr>
            <td><label>Lykilorð:</label></td>
            <td className="table-input"><input id="password" type="password" onChange={this.updatePassword.bind(this)}/></td>
          </tr>
        </table>
        <div>
          <Button children={(<span>Innskrá</span>)} onClick={this.loginPressed.bind(this)}/>
        </div>
        <div>
          <Link to="/register">Nýskráning</Link>
        </div>
      </div>
    );
  }
}

/* todo tengja við redux */

export default Login;
