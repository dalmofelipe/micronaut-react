import * as UserRepository from './UserRepository';
import type { ICreateUserRequest, IUpdateUserRequest } from '../types/User';

export class UserManager {
  async getUsers(page = 0, size = 10, search = "") {
    return UserRepository.getAll(page, size, search);
  }

  async createUser(data: ICreateUserRequest) {
    return UserRepository.create(data);
  }

  async updateUser(id: number, data: IUpdateUserRequest) {
    return UserRepository.update(id, data);
  }

  async toggleUserActive(id: number) {
    return UserRepository.toggleActive(id);
  }

  async deleteUser(id: number) {
    return UserRepository.remove(id);
  }

  async getUserById(id: number) {
    return UserRepository.getById(id);
  }

  async getCount() {
    return UserRepository.getCount();
  }
}
