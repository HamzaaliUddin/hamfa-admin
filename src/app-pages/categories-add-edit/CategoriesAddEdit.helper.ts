export const categoriesFormRules = () => ({
  name: {
    required: 'Category name is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Category name is required'
  },
  slug: {
    required: 'Slug is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Slug is required'
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

