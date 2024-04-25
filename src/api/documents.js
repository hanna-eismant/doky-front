import { get, post } from './request';

export const fetchDocuments = () => get('documents');

export const fetchDocument = id => get(`documents/${id}`);

export const createDocument = payload => post('documents', payload);
