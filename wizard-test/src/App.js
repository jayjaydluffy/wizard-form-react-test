import React, { Component } from 'react';
import { ModalContainer } from 'react-router-modal';

import Wizard from './components/Wizard/Wizard';
import { Mobile, Default } from './shared/utility';
import classes from './components/Wizard/Wizard.module.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Wizard />
        <Mobile>
          <ModalContainer containerClassName={classes.ModalContainerMobile} />
        </Mobile>
        <Default>
          <ModalContainer style={{position: 'fixed'}} />
        </Default>
      </div>
    );
  }
}

export default App;
