'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/services/axiosInstance';
import { ErrorResponseType } from '@/types/api.types';
import { User } from './useGetUsers.query';
import { CreateUserInput } from './useCreateUser.query';

type UpdateUserInput = Partial<Omit<CreateUserInput, 'password'>> & {
  password?: string;
};

interface UpdateUserParams {
  id: number | string;
  data: UpdateUserInput;
}

const updateUser = async ({ id, data }: UpdateUserParams): Promise<User> => {
  return await axiosInstance.put(`users/${id}`, data);
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
      toast.success('User updated successfully');
    },
    onError: (error: ErrorResponseType) => {
      toast.error(error?.data?.message || 'Failed to update user');
    },
  });
};

