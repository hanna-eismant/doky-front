import React from 'react';
import { useForm } from '../../../hooks/useForm.js';
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
  const [ documentMutation ] = useMutation(createDocument);
  const addToast = useAddToast();

  const {data, fields: {name, description}, handleSubmit } = useForm(
    initialFormData,
    documentMutation,
    () => {
      addToast('Created');
      onCreated();
    }
  );

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <HorizontalFormInput id="name" label="Name" type="text" value={data.name} onChange={name.setValue}
        errors={name.errors} />
      <HorizontalFormText id="description" label="Description" value={data.description}
        onChange={description.setValue}/>
      <div className="d-flex justify-content-between py-2">
        <input type="submit" value="Create" className="btn btn-primary mb-3 float-right"/>
      </div>
    </form>
  );
};

export default CreateDocumentForm;
