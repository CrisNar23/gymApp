export type Roles = 'standart' | 'admin';

export interface User {
  user_id: string;
  password: string;
}

export interface UserResponse {
  message: string;
  token: string;
  user_id: string;
  role_name: Roles;
}
