import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserManager } from "../service/UserManager";
import type { ICreateUserRequest, IUpdateUserRequest } from "../types/User";

export const useGetUsers = (page: number, size: number, search?: string) => {
  return useQuery({
    queryKey: ["users", page, size, search ?? ""],
    queryFn: () => UserManager.getAll(page, size, search),
  });
};

export const useGetUsersCount = () => {
  return useQuery({
    queryKey: ["users-count"],
    queryFn: () => UserManager.getCount(),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateUserRequest) => UserManager.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users-count"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: IUpdateUserRequest }) =>
      UserManager.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => UserManager.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users-count"] });
    },
  });
};

export const useToggleUserActive = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => UserManager.toggleActive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
