import React, { Component } from 'react';
import Form from 'react-bootstrap/lib/Form';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';

import FormControls from '../UI/FormControls';
import { updateObject, checkValidity, formDataIsValid, Default, Mobile } from '../../shared/utility';

export const commentType = [
  { value: 'staff', label: 'Staff Feedback' },
  { value: 'checkout', label: 'Checkout Feedback' },
  { value: 'product', label: 'Product Feedback' },
];

const step3Controls = {
  commentType: {
    elementType: 'select',
    elementConfig: {
      options: commentType
    },
    label: 'Comment for',
    value: 'staff',
    validation: {
      required: true,
    },
    valid: false,
    touched: false,
  },
  comment: {
    elementType: 'textarea',
    elementConfig: {
      placeholder: 'Comment',
      rows: "5"
    },
    label: 'Comment',
    value: '',
    validation: {
      required: true,
      maxLength: 1000
    },
    valid: false,
    touched: false,
  }
}

class Step3 extends Component {
  state = {
    controls: step3Controls,
    submissionValid: true,
  }

  componentDidMount() {
    // Populate with submitted data
    const { submittedData } = this.props;
    if (submittedData.step3) {
      const updatedState = updateObject(this.state.controls, submittedData.step3);
      this.setState({controls: updatedState});
    }
  }

  inputChangedHandler = ( event, controlName ) => {
    const updatedControls = updateObject( this.state.controls, {
      [controlName]: updateObject( this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
        touched: true
      } )
    } );
    this.setState( {
      controls: updatedControls,
      submissionValid: true,
    } );
  }

  handleNextStep = e => {
    e.preventDefault();
    if (formDataIsValid(this.state.controls)) {
      this.setState({ submissionValid: true }, () => {
        this.props.nav('next', 'step3', this.state.controls);
      });
    }
    else {
      this.setState({ submissionValid: false });
    }
  }

  render() {
    const errorMsg = this.state.submissionValid ? null : (
      <Form.Group>
        <Alert variant="danger" dismissible >
            Validation failed. Make sure you fill in valid data.
          </Alert>
      </Form.Group>
    );
    return (
      <Jumbotron>
        <Default><h1 className="display-3">{this.props.title}</h1></Default>
        <Mobile><h1 className="display-5">{this.props.title}</h1></Mobile>
        <hr className="my-4"></hr>
        <Form>
          {errorMsg}
          <FormControls
            controls={this.state.controls}
            inputChanged={this.inputChangedHandler}
            idIndex='add-post' />
          <Button size="lg" type='button' onClick={e => this.handleNextStep(e)}>
            { this.props.editMode ? 'Save' : 'Next' }
          </Button>
        </Form>
      </Jumbotron>
    );
  }
}

export default Step3;