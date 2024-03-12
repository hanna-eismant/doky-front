import React, {useCallback, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import useFormData from '../../hooks/useFormData.js';
import useRegisterQuery from './useRegisterQuery.js';
import {FormInput} from "../../components";
import AlertError from "../../components/AlertError.jsx";

const initialFormData = {
  uid: '',
  password: ''
};

export default () => {
  const [globalError, setGlobalError] = useState({message: ''});
  const [fieldsError, setFieldsError] = useState({})
  const {data, fields: {uid, password}} = useFormData(initialFormData);
  const [register] = useRegisterQuery();
  const navigate = useNavigate();

  const onSubmit = useCallback(async event => {
    event.preventDefault();
    const response = await register(data);
    if (response?.error) {
      setGlobalError({message: response.error.message});
      setFieldsError({fields: response.fields})
    } else {
      navigate('/');
    }
  });

  const useFieldError = (fieldName) => {
    return fieldsError?.fields?.find(({field}) => field === fieldName)
  }

  return (
    <>
      {globalError.message ? <AlertError message={globalError.message}/> : ''}
      <div className="d-flex align-items-center justify-content-center">
        <form onSubmit={onSubmit} className="col-3">
          <img className="mb-3 mt-3 img-fluid" src="logo-color-bg.svg"/>
          <FormInput id="uid" label="Email" type="text" value={data.uid} onChange={uid.setValue}
                     validationError={useFieldError('uid')}/>
          <FormInput id="password" label="Password" type="password" value={data.password} onChange={password.setValue}
                     validationError={useFieldError('password')}/>
          <div className="mt-3 row">
            <input type="submit" value="Register" className="btn btn-primary mb-3"/>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </>
  )
}
