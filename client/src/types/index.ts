import { AxiosError } from 'axios';
import { RouteProps } from 'react-router-dom';

export type LayoutProps = {
  children: JSX.Element[] | JSX.Element;
};

export type LoginInputs = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  username: string
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string
}

export type RegisterInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type NoteFormInputs = {
  title: string;
  text: string;
};

export interface PrivateRouteProps extends RouteProps {}

export type Note = {
  id: number;
  attributes: {
    title: string;
    text: string;
    user: { data: { id: number; attributes: { username: string } } };
  };
};

export type NotesResponse = {
  notes: Note[];
};

export type AddNoteData = {
  data: {
    title: string;
    text: string;
  };
};

export type UpdateNoteData = AddNoteData & {
  id: number;
};

export type ErrorHandlerProps = {
  error: AxiosError<any>;
};

export type ErrorMessageProps = {
  status?: string;
  name?: string;
  message?: string;
};

export type PaginationProps = {
  pageCount: number;
  page: number;
  handlePageClick: (selectedItem: { selected: number }) => void;
};

export type SeoProps = {
  title: string;
}
