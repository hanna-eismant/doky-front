import React, {useCallback} from 'react';
import EditDocumentForm from './EditDocumentForm/EditDocumentForm.jsx';
import {useNavigate} from 'react-router-dom';

export default () => {
  const navigate = useNavigate();

  const reload = useCallback(() => {

  }, [navigate]);
  const goBack = useCallback(() => {
    navigate('/documents');
  }, [navigate]);

  return (
    <>
      <div
        className="d-flex flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h3">
          <button className="btn btn-outline-primary me-3" onClick={goBack}>
            <i className="bi bi-arrow-left"></i>
          </button>
          <span className="align-middle">Edit Document</span>
        </h1>
      </div>
      <div>
        <EditDocumentForm onSaved={reload}/>
      </div>
    </>
  );
};
