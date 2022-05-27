import axios from 'axios';
import { getToken } from '../services/auth';
import { NotesResponse } from '../types';

export const getNotes = async (): Promise<NotesResponse> => {
  return await axios.get('http://localhost:1337/api/notes', {
    headers: { Authorization: 'Bearer ' + getToken() },
  });
};
