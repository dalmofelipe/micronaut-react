export interface IUser {
  id: number;
  name: string;
  email: string;
  active: boolean;
  createdAt: string;
}

export interface IUserFilters {
  page: number;
  size: number;
  search: string;
}

export interface ICreateUserRequest {
  name: string;
  email: string;
  active?: boolean;
}

export interface IUpdateUserRequest {
  name: string;
  email: string;
  active?: boolean;
}
