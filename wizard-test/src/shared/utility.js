import React from 'react';
import Loadable from 'react-loadable';
import Responsive from 'react-responsive';

import Preloader from '../components/Preloader/Preloader';

export const split = loc => {
  return Loadable({
    loader: () => import('../' + loc),
    loading: Preloader,
  });
}

export const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  };
};

export const checkValidity = ( value, rules ) => {
  let isValid = true;
  if ( !rules ) {
      return true;
  }

  if ( rules.required ) {
      isValid = value.trim() !== '' && isValid;
  }

  if ( rules.minLength ) {
      isValid = value.length >= rules.minLength && isValid
  }

  if ( rules.maxLength ) {
      isValid = value.length <= rules.maxLength && isValid
  }

  if ( rules.isEmail ) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test( value ) && isValid
  }

  if ( rules.isNumeric ) {
      const pattern = /^\d+$/;
      isValid = pattern.test( value ) && isValid
  }

  return isValid;
}

export const formDataIsValid = ( formData ) => {
  let data = true;
  for ( let key in formData ) {
      if (formData[key].validation.required) {
          data = data && formData[key].valid;
      }
  }
  return data;
}


export const Desktop = props => <Responsive {...props} minWidth={992} />;
export const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
export const Mobile = props => <Responsive {...props} maxWidth={767} />;
export const Default = props => <Responsive {...props} minWidth={768} />;