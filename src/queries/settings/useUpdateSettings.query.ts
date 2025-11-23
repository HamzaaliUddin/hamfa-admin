'use client';

import axiosInstance from '@/api/axios';
import { ErrorResponseType } from '@/types/api.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Setting } from './useGetSettings.query';

type UpdateSettingsInput = Partial<Omit<Setting, 'setting_id' | 'created_at' | 'updated_at'>>;

const updateSettings = async (data: UpdateSettingsInput): Promise<Setting> => {
  return await axiosInstance.put('/setting', data);
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
