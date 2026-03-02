import type { ICreateUserRequest, IUpdateUserRequest } from '../types/User';
import { UserRepository } from './UserRepository';

export const UserManager = {
  getAll: (page = 0, size = 10, search = "") => UserRepository.getAll(page, size, search),

  getAllUnpaged: () => UserRepository.getAllUnpaged(),
  
  getCount: () => UserRepository.getCount(),
  
  getById: (id: number) => UserRepository.getById(id),
  
  create: (data: ICreateUserRequest) => UserRepository.create(data),
  
  update: (id: number, data: IUpdateUserRequest) => UserRepository.update(id, data),
  
  toggleActive: (id: number) => UserRepository.toggleActive(id),
  
  remove: (id: number) => UserRepository.remove(id),
};
