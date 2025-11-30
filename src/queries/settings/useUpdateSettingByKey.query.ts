'use client';

import axiosInstance from '@/services/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Setting } from './useGetSettings.query';

interface UpdateSettingByKeyParams {
  key: string;
  value: string;
}

interface UpdateSettingByKeyResponse {
  data: Setting;
  message: string;
}

const updateSettingByKey = async ({ key, value }: UpdateSettingByKeyParams): Promise<Setting> => {
  const response: UpdateSettingByKeyResponse = await axiosInstance.patch(`/setting/key/${key}`, { value });
  return response.data;
};

export const useUpdateSettingByKey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSettingByKey,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      queryClient.invalidateQueries({ queryKey: ['setting', variables.key] });
      toast.success('Setting updated successfully');
    },
    onError: (error: any) => {
      const errorMessage = error?.error || error?.message || 'Failed to update setting';
      toast.error(errorMessage);
    },
  });
};

