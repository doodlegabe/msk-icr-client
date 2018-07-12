import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Segment, Container, Form, Button, Image, TextArea} from 'semantic-ui-react';
import ajax from 'superagent';

export default class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providerABBYY: false,
      providerGoogle: false,
      providerMicrosoft: false,
      imageFile: null,
      imageFileName: '',
      providers:[],
      isLoading: false,
      responseReceived: false,
      responseObj: {}
    };
    this.setFile = this.setFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.createProviderList = this.createProviderList.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset(){
    this.setState({
      imageFile: null,
      imageFileName: '',
      providers:[],
      isLoading: false,
      responseReceived: false,
      responseObj: {}
    });
  }

  createProviderList(){
    let temp = [];
    if(this.state.providerGoogle){
      temp.push('google');
    }
    if(this.state.providerMicrosoft){
      temp.push('microsoft');
    }
    if(this.state.providerABBYY){
      temp.push('flexi');
    }
    return temp;
  }

  handleCheck(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(){
    this.setState({
      isLoading: true
    });
    ajax
      .post(process.env.API_HOST + '/transcribe')
      .accept('application/json')
      .field('providers', this.createProviderList())
      .attach('imageFile', this.state.imageFile)
      .end((error, response) => {
        console.log(response);
        this.setState({
          isLoading: false,
          responseObj: response.body,
          responseReceived: true
        });
      });

  }
  fileBrowser() {
    document.getElementById('file-browser').click();
    event.preventDefault();
  }

  handleChange(){
    event.preventDefault();
  }

  setFile(event) {
    const value = event.target.files[0];
    this.setState({
      imageFile: value,
      imageFileName: value.name
    });
    event.preventDefault();
  }

  render() {
    const fileSelectStyle = {
      visibility: 'hidden',
      height: '1px !important',
      position:'absolute',
      top: '-3000px'
    };
    return (
      <Segment>
        { this.state.responseReceived ? null :
        <Container>
          <Form loading={this.state.isLoading}>
            <Form.Group inline>
              <label>Select an ICR Provider</label>
              <Form.Field
                name='providerGoogle'
                type='checkbox'
                label='Google'
                control='input'
                checked={this.state.providerGoogle}
                onChange={this.handleCheck}
              />
              <Form.Field
                name='providerMicrosoft'
                type='checkbox'
                label='Microsoft'
                control='input'
                checked={this.state.providerMicrosoft}
                onChange={this.handleCheck}
              />
              <Form.Field
                name='providerABBYY'
                type='checkbox'
                label='ABBYY'
                control='input'
                checked={this.state.providerABBYY}
                onChange={this.handleCheck}
              />
            </Form.Group>
            <Form.Group inline>
            <Form.Field>
            <label className="file-upload-container">
              <div className="uploading-instructions">Select an image file from your computer</div>
              <input
                type="file"
                accept=".png,.jpg,.jpeg"
                className="upload-button"
                onChange={this.setFile}
                id="file-browser"
                style={fileSelectStyle}
              />
            </label>
            </Form.Field>
            <Button basic onClick={this.fileBrowser}>
              {this.state.imageFileName ? this.state.imageFileName : <span>Select an image file</span>}
            </Button>
            </Form.Group>
            <Button primary onClick={this.handleSubmit}>Submit</Button>
          </Form>
        </Container> }
        { this.state.responseReceived ?
          <Container style={{ textAlign:'center' }}>
            <Image src={this.state.responseObj.imageURI}  size='medium' bordered style={{ minWidth:600, marginLeft:'auto', marginRight:'auto' }}/>
            <h3>Transcription Results</h3>
            <TextArea autoHeight placeholder={JSON.stringify(this.state.responseObj.transcriptions, undefined, 4)} style={{ minHeight: 300, minWidth:600 }}/>
            <Button positive onClick={this.handleReset}>Transcribe Another Image</Button>
          </Container>
        : null }
      </Segment>
    )
  }
};

UploadForm.propTypes = {
  providerABBYY: PropTypes.bool,
  providerGoogle: PropTypes.bool,
  providerMicrosoft: PropTypes.bool,
  imageFile: PropTypes.shape(),
  imageFileName: PropTypes.string,
  providers: PropTypes.array,
  isLoading: PropTypes.bool,
  responseReceived: PropTypes.bool,
  responseObj: PropTypes.object
};