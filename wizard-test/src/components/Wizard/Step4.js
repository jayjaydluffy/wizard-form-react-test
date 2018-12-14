import React, { Component, Fragment } from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import CardDeck from 'react-bootstrap/lib/CardDeck';
import Card from 'react-bootstrap/lib/Card';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import Button from 'react-bootstrap/lib/Button';
import replace from 'lodash/replace';
import parseInt from 'lodash/parseInt';

import {commentType} from './Step3';
import { Default, Mobile } from '../../shared/utility';


class Step4 extends Component {
  render() {
    return (
      <Jumbotron>
        <Default><h1 className="display-3">{this.props.title}</h1></Default>
        <Mobile><h1 className="display-5">{this.props.title}</h1></Mobile>
        <hr className="my-4"></hr>
        <CardDeck>
          { map(this.props.submittedData, (step, key) => (
            <Card key={key} border='primary'>
              <Card.Header>
                {this.props.stepTitles[key]}
                <Button
                  type='button'
                  size='sm'
                  variant="link"
                  onClick={e => this.props.edit(e, parseInt(replace(key, 'step', '')))}>
                  edit
                </Button>
              </Card.Header>
              <Card.Body>
                <Card.Text as='dl'>
                  { map(step, (element, elKey) => (
                    <Fragment key={elKey}>
                      <dt>{element.label}</dt>
                      { elKey === 'commentType' ?
                        <dd>{find(commentType, {value: element.value}).label}</dd> :
                        <dd>{isEmpty(element.value) ? 'N/A' : element.value}</dd>
                      }
                    </Fragment>
                  )) }
                </Card.Text>
              </Card.Body>
            </Card>
          )) }
        </CardDeck>
      </Jumbotron>
    );
  }
}

export default Step4;