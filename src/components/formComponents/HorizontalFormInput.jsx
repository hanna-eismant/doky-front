import React, {useCallback} from 'react';
import {noop} from '../../utils';
import classNames from 'classnames';

export default ({label, id, type, value = '', disabled = false, onChange = noop, validationError}) => {
  const handleOnChange = useCallback(event => {
    event.preventDefault();
    onChange(event.target.value);
  }, [onChange]);

  const inputClassesList = classNames('form-control', {
    'is-invalid': validationError
  });

  return (
    <div className="row mb-3">
      <label className="col-sm-2 col-form-label" htmlFor={id}>{label}:</label>
      <div className="col-sm-10 has-validation">
        <input className={inputClassesList} id={id} type={type} value={value} disabled={disabled} onChange={handleOnChange}
          aria-describedby={'validation' + id + 'Feedback'}/>
        {validationError ?
          <div id={'validation' + id + 'Feedback'} className="invalid-feedback">
            {validationError.messages.map((message) => (<div>{message}</div>))}
          </div>
          : null}
      </div>
    </div>
  );
};
