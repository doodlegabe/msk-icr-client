import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';
import {Intro, UploadForm} from '../index';


export default class SideBySide extends Component {
  render() {
    return (
      <Grid padded>
        <Grid.Row stretched>
          <Grid.Column width={6}>
           <Intro/>
          </Grid.Column>
          <Grid.Column width={10}>
            <UploadForm/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}