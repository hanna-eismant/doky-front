import { get, post, put } from './request';

export const fetchDocuments = () => get('documents');

export const fetchDocument = id => get(`documents/${id}`);

export const createDocument = payload => post('documents', payload);

export const updateDocument = payload => put(`documents/${payload.id}`, payload);
