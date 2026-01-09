export const collectionsFormRules = () => ({
  title: {
    required: 'Collection title is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Collection title is required'
  },
  image: {
    required: 'Collection image is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Collection image is required'
  },
  category_id: {
    required: 'Category is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Category is required'
  }
});
