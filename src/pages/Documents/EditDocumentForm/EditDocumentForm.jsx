import React, {useCallback, useState} from 'react';
import useFormData from "../../../hooks/useFormData";
import HorizontalFormInput from "../../../components/formComponents/HorizontalFormInput.jsx";
import HorizontalFormText from "../../../components/formComponents/HorizontalFormText.jsx";
import { useAddToast } from '../../../components/Toasts';
import { useMutation } from '../../../hooks/useMutation.js';
import { updateDocument } from '../../../api/documents.js';

export default ({ document }) => {
  const [fieldsError, setFieldsError] = useState({})
  const { data, fields: { name, description } } = useFormData(document);
  const [ editDocument, { isLoading } ] = useMutation(updateDocument);
  const addToast = useAddToast();

  const onSubmit = useCallback(async event => {
    event.preventDefault();

    const response = await editDocument(data);
    if (response?.error) {
      addToast(response.error.message)
      setFieldsError({fields: response.fields})
    } else {
      addToast('Saved')
    }
  });

  const useFieldError = (fieldName) => {
    return fieldsError?.fields?.find(({field}) => field === fieldName)
  }

  return (
    <form onSubmit={onSubmit} className="mt-3">
      <HorizontalFormInput id="name" label="Name" type="text" value={data.name} onChange={name.setValue}
                           validationError={useFieldError('name')}/>
      <HorizontalFormText id="description" label="Description" value={data.description}
                          onChange={description.setValue}/>
      <div className="text-secondary">
        <em>Created by: {document.createdBy} at {document.createdDate}</em>
      </div>
      <div className="text-secondary">
        <em>Modified by: {document.modifiedBy} at {document.modifiedDate}</em>
      </div>
      <div className="d-flex justify-content-between py-2">
        <input type="submit" value="Save" disabled={isLoading} className="btn btn-primary mb-3 float-right"/>
      </div>
    </form>
  );
};
