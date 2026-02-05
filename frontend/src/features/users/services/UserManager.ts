import * as UserRepository from './UserRepository';
import type { ICreateUserRequest, IUpdateUserRequest } from '../types/User';

export const getAllUsers = async (page = 0, size = 10, search = "") => {
  return UserRepository.getAll(page, size, search);
};

export const getCount = async () => {
    return UserRepository.getCount();
};

export const getUserById = async (id: number) => {
  return UserRepository.getById(id);
};

export const createUser = async (data: ICreateUserRequest) => {
  return UserRepository.create(data);
};

export const updateUser = async (id: number, data: IUpdateUserRequest) => {
  return UserRepository.update(id, data);
};

export const toggleUserActive = async (id: number) => {
    return UserRepository.toggleActive(id);
};

export const deleteUser = async (id: number) => {
  return UserRepository.remove(id);
};
