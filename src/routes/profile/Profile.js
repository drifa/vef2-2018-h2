import React, { Component } from 'react';

import './Profile.css';
import Button from '../../components/button';

export default class Profile extends Component {

  render() {
    return (
      <div className="profile">
        <input type="file"></input>
        <Button>Uppfæra mynd</Button>
        <table>
          <tbody>
            <tr>
              <td><label>Nafn:</label></td>
              <td><input type="text"></input></td>
            </tr>
          </tbody>
        </table>
        <Button>Uppfæra nafn</Button>
        <table>
          <tbody>
            <tr>
              <td><label>Lykilorð:</label></td>
              <td><input type="text"></input></td>
            </tr>
            <tr>
              <td><label>Lykilorð, aftur:</label></td>
              <td><input type="text"></input></td>
            </tr>
          </tbody>
        </table>
        <Button>Uppfæra lykilorð</Button>
      </div>
    )
  }
}
