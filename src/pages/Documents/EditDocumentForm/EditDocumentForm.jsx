import React from 'react';
import HorizontalFormInput from '../../../components/formComponents/HorizontalFormInput.jsx';
import HorizontalFormText from '../../../components/formComponents/HorizontalFormText.jsx';
import { useAddToast } from '../../../components/Toasts';
import { useMutation } from '../../../hooks/useMutation.js';
import { updateDocument } from '../../../api/documents.js';
import { useForm } from '../../../hooks/useForm.js';
import AlertError from '../../../components/AlertError.jsx';

const EditDocumentForm = ({ document }) => {
  const [ editDocument, { isLoading } ] = useMutation(updateDocument);

  const addToast = useAddToast();
  const { data, fields: { name, description }, handleSubmit } = useForm(document, editDocument, () => {
    addToast('saved');
  });

  return (
    <>
      {globalError ? <AlertError message={globalError} /> : null}
      <form onSubmit={handleSubmit} className="mt-3">
        <HorizontalFormInput id="name" label="Name" type="text" value={data.name} onChange={name.setValue}
          errors={name.errors}/>
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
    </>
  );
};

export default EditDocumentForm;
