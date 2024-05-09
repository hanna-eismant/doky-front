import React, {useCallback} from 'react';
import {noop, getValidRowCount} from '../../utils';

const HorizontalFormText = ({label, id, value = '', onChange = noop}) => {

  const handleOnChange = useCallback(event => {
    event.preventDefault();
    onChange(event.target.value);
  }, [onChange]);

  const countRows = (text) => {
    const current = text.split('\n');
    return getValidRowCount(current.length);
  };

  return (
    <div className="mt-4">
      <label className="form-label" htmlFor={id}>{label}:</label>
      <textarea className="form-control" rows={countRows(value)} id={id} value={value} onChange={handleOnChange}/>
    </div>
  );
};

export default HorizontalFormText;
