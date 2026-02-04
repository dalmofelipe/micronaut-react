import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/userService";
import type { ICreateUserRequest, IUpdateUserRequest } from "../types";

export const useGetUsers = (page: number, size: number, search: string) => {
  return useQuery({
    queryKey: ['users', page, size, search],
    queryFn: () => userService.getAll(page, size, search),
  });
};

export const useGetUsersCount = () => {
  return useQuery({
    queryKey: ['users-count'],
    queryFn: () => userService.getCount(),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateUserRequest) => userService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users-count'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: IUpdateUserRequest }) => userService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
};

export const useToggleUserActive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => userService.toggleActive(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => userService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['users-count'] });
    },
  });
};
