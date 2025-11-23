'use client';

import axiosInstance from '@/api/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Setting } from './useGetSettings.query';

export interface UpdateSettingInput {
  value?: string;
  type?: 'string' | 'number' | 'boolean' | 'json';
  category?: 'general' | 'email' | 'payment' | 'shipping' | 'security' | 'appearance';
  description?: string;
  is_public?: boolean;
}

interface UpdateSettingParams {
  id: number | string;
  data: UpdateSettingInput;
}

interface UpdateSettingResponse {
  data: Setting;
  message: string;
}

const updateSetting = async ({ id, data }: UpdateSettingParams): Promise<Setting> => {
  const response: UpdateSettingResponse = await axiosInstance.put(`/setting/${id}`, data);
  return response.data;
};

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      toast.success('Setting updated successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to update setting';
      toast.error(errorMessage);
    },
  });
};

