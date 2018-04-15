import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

class Home extends Component {



  render() {
    console.log(JSON.stringify(this.props));
    const isLoggedIn = this.props.authenticated;
    console.log("Authenticated " + isLoggedIn);
    /* todo birta mismunandi upplýsingar ef innskráður notandi eða ekki */
    const loggedInDiv = (
      <div className="home-text">
        <p>
          Þú ert skráður notandi og getur því <Link to='/#'>skráð bækur</Link>
          og <Link to='/books'>breytt þeim sem til eru</Link>.
        </p>
        <p>
          Einnig getur þú skoðað <Link to='/users'>aðra notendur</Link>.
        </p>
      </div>
    );

    const loggedOutDiv = (
      <div className="home-text">
      <p>
        Til að njóta bókasafnsins til fullnustu mælum við með að <Link to='/login'>skrá sig inn</Link>.
        Þangað til getur þú skoðað <Link to='/books'>allar bækurnar</Link>.
      </p>
      </div>
    );
    return (
      <div className="home">
        <h1>Velkominn á bókasafnið</h1>
        {isLoggedIn ? loggedInDiv : loggedOutDiv}
      </div>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default Home;
