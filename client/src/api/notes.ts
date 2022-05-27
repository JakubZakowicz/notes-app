import { getToken } from '../services/auth';
import { NotesResponse } from '../types';
import api from './api';

export const getNotes = async (): Promise<NotesResponse> => {
  return await api.get('/notes', {
    headers: { Authorization: 'Bearer ' + getToken() },
  });
};
