import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {



  render() {
    const isLoggedIn = true;
    /* todo birta mismunandi upplýsingar ef innskráður notandi eða ekki */
    const loggedInDiv = (
      <div className="home-logedIn">

      </div>
    );

    const loggedOutDiv = (
      <div className="home">
        
      </div>
    );
    return (
      <div>
        <h1>Velkominn á bókasafnið</h1>
        {isLoggedIn ? loggedInDiv : loggedOutDiv}

        <p><Link to="/login">Innskráning</Link></p>
      </div>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default Home;
