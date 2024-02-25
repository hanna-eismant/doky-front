import React, {useCallback, useEffect} from 'react';
import EditDocumentForm from './EditDocumentForm/EditDocumentForm.jsx';
import {useNavigate, useParams} from 'react-router-dom';
import useDocumentQuery from './useDocumentQuery.js';

export default () => {
  const navigate = useNavigate();
  const params = useParams();
 
  const goBack = useCallback(() => {
    navigate('/documents');
  }, [navigate]);

  const [ fetchDocument, { data, isLoading } ] = useDocumentQuery();

  useEffect(() => {
    debugger;
    fetchDocument(params.id);
  }, [ fetchDocument, params.id ]);

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
        {!isLoading && <EditDocumentForm document={data} />}
      </div>
    </>
  );
};
