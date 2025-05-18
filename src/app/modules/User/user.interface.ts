export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}