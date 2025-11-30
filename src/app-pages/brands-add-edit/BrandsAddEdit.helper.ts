export const brandsFormRules = () => ({
  name: {
    required: 'Brand name is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Brand name is required'
  },
  description: {
    required: 'Description is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Description is required'
  },
  status: {
    required: 'Status is required'
  }
});

