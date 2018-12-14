import React, { Component, Fragment } from 'react';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { Modal } from 'react-router-modal';

import { split, updateObject, Mobile, Default } from '../../shared/utility';
import 'react-router-modal/css/react-router-modal.css';
import classes from './Wizard.module.css';

const Step1 = split('components/Wizard/Step1');
const Step2 = split('components/Wizard/Step2');
const Step3 = split('components/Wizard/Step3');
const Step4 = split('components/Wizard/Step4');

const getStep = (step, formProps, titles, editMode=false) => {
  switch (step) {
    case 1:
      return <Step1 {...formProps} title={titles[`step${step}`]} editMode={editMode} />
    case 2:
      return <Step2 {...formProps} title={titles[`step${step}`]} editMode={editMode} />
    case 3:
      return <Step3 {...formProps} title={titles[`step${step}`]} editMode={editMode} />
    case 4:
      return <Step4 {...formProps} title={titles[`step${step}`]} editMode={editMode} />
    default:
      return null
  }
}

class Wizard extends Component {
  state = {
    step: 1,
    formData: {
      step1: null,
      step2: null,
      step3: null,
    },
    title: {
      step1: 'Step 1: Basic Info',
      step2: 'Step 2: Address',
      step3: 'Step 3: Comment',
      step4: 'Step 4: Review',
    },
    edit: null
  }

  handleNavigateForm = (btn, currentStep, data) => {
    const { step, formData } = this.state;

    // Navigating either way should update the form data
    const updatedFormData = updateObject( formData, {
      [currentStep]: updateObject( formData[currentStep], data)
    });

    if (this.state.edit) {
      this.setState({
        edit: null,
        formData: updatedFormData
      })
    }
    else {
      this.setState({
        step: btn === 'next' ? step + 1 : step - 1,
        formData: updatedFormData
      })
    }
  }

  handleEditData = (e, step) => {
    e.preventDefault();
    this.setState({
      edit: step
    })
  }

  render() {
    const formProps = {
      nav: this.handleNavigateForm,
      submittedData: this.state.formData,
      stepTitles: this.state.title,
      edit: this.handleEditData,
      saveEdit: this.handleSaveEdit
    }
    const form = getStep(this.state.step, formProps, this.state.title);
    return (
      <Container>
        <Row>
          <Col>
            {form}
            { this.state.edit ?
              <Fragment>
                <Mobile>
                  <Modal className={classes.FullScreenModal} onBackdropClick={() => this.setState({edit: null})}>
                    { getStep(this.state.edit, formProps, this.state.title, true) }
                  </Modal>
                </Mobile>
                <Default>
                  <Modal onBackdropClick={() => this.setState({edit: null})}>
                    { getStep(this.state.edit, formProps, this.state.title, true) }
                  </Modal>
                </Default>
              </Fragment> : null
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Wizard;