import { AxiosResponse } from 'axios';
import { getToken } from '../services/auth';
import { Note, AddNoteData, UpdateNoteData } from '../types';
import api from './api';

const authorizationHeader = {
  headers: { Authorization: `Bearer ${getToken()}` },
};

export const getNotes = async (): Promise<Note[]> =>
  await api.get('/notes', authorizationHeader).then(res => res.data.data);

export const getNote = async (id: number): Promise<Note> =>
  await api.get(`/notes/${id}`, authorizationHeader).then(res => res.data.data);

export const addNote = async (data: AddNoteData): Promise<AxiosResponse> =>
  await api.post('/notes', data, authorizationHeader);

export const updateNote = async (
  data: UpdateNoteData
): Promise<AxiosResponse> => {
  return await api.put(`/notes/${data.id}`, data, authorizationHeader);
};

export const deleteNote = async (id: number): Promise<AxiosResponse> =>
  await api.delete(`/notes/${id}`, authorizationHeader);
