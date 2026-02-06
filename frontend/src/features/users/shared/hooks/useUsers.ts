import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserManager } from '../services/UserManager';
import type { ICreateUserRequest, IUpdateUserRequest } from '../types/User';

const userManager = new UserManager();

export const useGetUsers = (page: number, size: number, search?: string) => {
  return useQuery({
    queryKey: ['users', page, size, search],
    queryFn: () => userManager.getUsers(page, size, search),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateUserRequest) => userManager.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: IUpdateUserRequest }) =>
      userManager.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => userManager.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useToggleUserActive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => userManager.toggleUserActive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useGetUsersCount = () => {
  return useQuery({
    queryKey: ['users-count'],
    queryFn: () => userManager.getCount(),
  });
};
