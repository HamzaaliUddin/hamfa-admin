'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import axiosInstance from '@/api/axios';
import { ErrorResponseType } from '@/types/api.types';
import { Settings } from './useGetSettings.query';

type UpdateSettingsInput = Partial<Omit<Settings, 'id' | 'createdAt' | 'updatedAt'>>;

const updateSettings = async (data: UpdateSettingsInput): Promise<Settings> => {
  return await axiosInstance.put('settings', data);
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success('Settings updated successfully');
    },
    onError: (error: ErrorResponseType) => {
      toast.error(error?.data?.message || 'Failed to update settings');
    },
  });
};

