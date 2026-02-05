import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as UserManager from "../services/UserManager";
import type { ICreateUserRequest, IUpdateUserRequest } from "../types/User";

export const useGetUsers = (page: number, size: number, search: string) => {
  return useQuery({
    queryKey: ['users', page, size, search],
    queryFn: () => UserManager.getAllUsers(page, size, search),
  });
};

export const useGetUsersCount = () => {
  return useQuery({
    queryKey: ['users-count'],
    queryFn: () => UserManager.getCount(), // Need to check if Manager has this. I didn't add it in Step 193.
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateUserRequest) => UserManager.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users-count'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: IUpdateUserRequest }) => UserManager.updateUser(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
};

export const useToggleUserActive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // UserManager needs toggleUserActive
    mutationFn: (id: number) => UserManager.toggleUserActive(id), 
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => UserManager.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users-count'] });
    },
  });
};
