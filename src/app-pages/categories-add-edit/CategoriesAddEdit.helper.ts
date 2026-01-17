export const categoriesFormRules = () => ({
  name: {
    required: 'Category name is required',
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'Category name is required'
  },
  position: {
    min: { value: 1, message: 'Position must be 1 or greater' },
    validate: (value: number | string) => {
      // Position validation is handled conditionally based on show_on_home
      if (value === undefined || value === null || value === '') return true;
      const numValue = Number(value);
      if (isNaN(numValue)) return 'Position must be a valid number';
      if (numValue < 1) return 'Position must be 1 or greater';
      return true;
    }
  },
  status: {
    required: 'Status is required'
  },
  image: {},
  show_on_home: {}
});
