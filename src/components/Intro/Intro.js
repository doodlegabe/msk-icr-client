import React, { Component } from 'react';
import {Segment, Header} from 'semantic-ui-react';

export default class Intro extends Component {
  static propTypes = {
  };

  render() {
    return (
      <Segment>
        <Header>Image Transcription</Header>
        <p>
          Select an ICR provider and an image to begin transcription. See  <a href={process.env.API_HOST + '/index.html'}> documentation</a> for more information.
        </p>
      </Segment>
    )
  }
};