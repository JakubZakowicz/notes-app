import { RouteProps } from 'react-router-dom';

export interface LoginInputs {
  email: string;
  password: string;
}

export interface RegisterInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface PrivateRouteProps extends RouteProps {}

interface Note {
  id: number;
  attributes: { title: string; text: string };
}

export interface NotesResponse {
  data: { data: Note[] };
}

export interface NoteResponse {
  data: { data: Note };
}

export interface NotePost {
  data: {
    title: string;
    text: string;
  };
}

export interface NotePut {
  id: string | undefined
  data: {
    title: string;
    text: string;
  };
}
