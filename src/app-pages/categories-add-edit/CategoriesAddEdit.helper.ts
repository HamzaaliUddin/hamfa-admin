export const categoriesFormRules = () => ({
  name: {
    required: 'Category name is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Category name is required'
  }
});
