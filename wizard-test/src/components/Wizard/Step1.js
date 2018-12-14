import React, { Component } from 'react';
import Form from 'react-bootstrap/lib/Form';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';

import FormControls from '../UI/FormControls';
import { updateObject, checkValidity, formDataIsValid, Default, Mobile } from '../../shared/utility';

const step1Controls = {
  firstname: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Enter first name'
    },
    label: 'First Name',
    value: '',
    validation: {
      required: true,
    },
    valid: false,
    touched: false
  },
  lastname: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Enter last name'
    },
    label: 'Last Name',
    value: '',
    validation: {
      required: true,
    },
    valid: false,
    touched: false
  },
  email: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Enter email address'
    },
    label: 'Email',
    value: '',
    validation: {
      required: true,
      isEmail: true
    },
    valid: false,
    touched: false
  },
  phone: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Enter phone number'
    },
    label: 'Phone Number',
    value: '',
    validation: {
      required: false,
    },
    valid: false,
    touched: false
  },
}

class Step1 extends Component {
  state = {
    controls: step1Controls,
    submissionValid: true,
  }

  componentDidMount() {
    // Populate with submitted data
    const { submittedData } = this.props;
    if (submittedData.step1) {
      const updatedState = updateObject(this.state.controls, submittedData.step1);
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
        this.props.nav('next', 'step1', this.state.controls);
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

export default Step1;