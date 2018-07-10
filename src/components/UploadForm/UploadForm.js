import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Container, Segment, Button} from 'semantic-ui-react';
import ajax from 'superagent';

export default class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.setFile = this.setFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  fileBrowser() {
    document.getElementById('file-browser').click();
    event.preventDefault();
  }

  handleUpload(file){

    ajax
      .post('http://localhost:5050/transcribe')
      .accept('application/json')
      .field('providers',['google'])
      .attach('imageFile', file)
      .end((error, response) => {
        console.log(response);
      });
  }

  setFile(event) {
    const value = event.target.files[0];
    this.handleUpload(value);
    event.preventDefault();
  }

  render() {

    const buttonName = this.state.uploadedFile ? 'Upload image' : 'Browse';
    const buttonClass = this.state.uploadedFile ? 'upload-btn file-loaded-btn' : 'upload-btn';

    return (

      <Container>
          <div className="upload-wrapper">
            <label className="file-upload-container">
              <div className="uploading-instructions">Select an image file from your computer</div>
              <input
                type="file"
                accept=".png,.jpg,.jpeg"
                className="upload-button"
                onChange={this.setFile}
                id="file-browser"
              />
            </label>
            <Button basic className={buttonClass} onClick={this.fileBrowser}>
              {buttonName}
            </Button>
          </div>
      </Container>
    )
  }
};

UploadForm.propTypes = {

};