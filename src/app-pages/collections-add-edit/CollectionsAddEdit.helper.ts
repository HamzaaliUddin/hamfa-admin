export const collectionsFormRules = () => ({
  title: {
    required: 'Collection title is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Collection title is required'
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

