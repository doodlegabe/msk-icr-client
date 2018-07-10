import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';
import {Intro, UploadForm} from '../index';


export default class SideBySide extends Component {
  render() {
    return (
      <Grid container={true} stretched={true} mobile={16} tablet={8} computer={4}>
        <Grid.Row>
          <Grid.Column>
           <Intro/>
          </Grid.Column>
          <Grid.Column>
            <UploadForm/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}