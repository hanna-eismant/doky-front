import { get } from './request';

export const fetchDocuments = () => get('documents');

export const fetchDocument = id => get(`documents/${id}`);
