import React from 'react'
import {Container} from 'semantic-ui-react'
import {MainNav, SideBySide} from 'components';

import 'styling/semantic.less'

const App = () => (
  <Container fluid={true}>
    <MainNav/>
    <SideBySide/>
  </Container>
);

export default App