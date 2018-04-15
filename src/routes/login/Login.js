import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import Button from '../../components/button';

import { requestLogin } from '../../actions/auth';

/* todo sækja actions frá ./actions */

import './Login.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    }
  }

  onUpdateAuth(auth) {
     this.props.onUpdateAuth(auth);
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

      if (data.error) {
        let newState = Object.assign({}, this.state);
        newState.error = data.error;
        this.setState(newState);
      } else {
        this.onUpdateAuth(data);
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

    let redirect = (null);

    if (this.props.auth.user) {
      redirect = (<Redirect to="/" push />);
    }

    return (
      <div className="login">
        {redirect}
        <div>
          <h2 className="title">Innskráning</h2>
        </div>
        <p className="error">{this.state.error}</p>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapActionsToProps = {
  onUpdateAuth: requestLogin,
}

/* todo tengja við redux */
export default connect(mapStateToProps, mapActionsToProps)(Login);
