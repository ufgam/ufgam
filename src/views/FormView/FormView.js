import Styles from './Form.module.css';
import React from 'react';
import Form from '../../components/Form/Form';

const FormView = () => {
  return (
    <div className={Styles.container}>
      <Form />
    </div>
  );
};

export default FormView;
