import React, {useCallback, useState} from 'react';
import { useFormData } from '../../../hooks/useFormData';
import HorizontalFormInput from '../../../components/formComponents/HorizontalFormInput.jsx';
import HorizontalFormText from '../../../components/formComponents/HorizontalFormText.jsx';
import { useAddToast } from '../../../components/Toasts';
import { useMutation } from '../../../hooks/useMutation.js';
import { createDocument } from '../../../api/documents.js';

const initialFormData = {
  name: '',
  description: ''
};

const CreateDocumentForm = ({onCreated}) => {
  const [fieldsError, setFieldsError] = useState({});
  const {data, fields: {name, description}} = useFormData(initialFormData);
  const [ documentMutation ] = useMutation(createDocument);
  const addToast = useAddToast();

  const onSubmit = useCallback(async event => {
    event.preventDefault();

    const response = await documentMutation(data);
    if (response?.error) {
      addToast(response.error.message);
      setFieldsError({fields: response.fields});
    } else {
      addToast('Created');
      onCreated();
    }
  }, [addToast, data, documentMutation, onCreated]);

  const useFieldError = (fieldName) => {
    return fieldsError?.fields?.find(({field}) => field === fieldName);
  };

  return (
    <form onSubmit={onSubmit} className="mt-3">
      <HorizontalFormInput id="name" label="Name" type="text" value={data.name} onChange={name.setValue}
        validationError={useFieldError('name')}/>
      <HorizontalFormText id="description" label="Description" value={data.description}
        onChange={description.setValue}/>
      <div className="d-flex justify-content-between py-2">
        <input type="submit" value="Create" className="btn btn-primary mb-3 float-right"/>
      </div>
    </form>
  );
};

export default CreateDocumentForm;
