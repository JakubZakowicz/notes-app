import { getToken } from '../services/auth';
import { NotesResponse, NotePost } from '../types';
import api from './api';

export const getNotes = async (): Promise<NotesResponse> =>
  await api.get('/notes', {
    headers: { Authorization: 'Bearer ' + getToken() },
  });

export const addNote = async (data: NotePost): Promise<Response> =>
  await api.post('/notes', data, {
    headers: { Authorization: 'Bearer ' + getToken() },
  });
