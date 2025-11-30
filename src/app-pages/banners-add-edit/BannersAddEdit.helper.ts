export const bannersFormRules = () => ({
  title: {
    required: 'This field is required',
    minLength: {
      value: 3,
      message: 'Minimum 3 characters required'
    },
    maxLength: {
      value: 50,
      message: 'Maximum 50 characters allowed'
    },
    validate: (value: string) =>
      (value && String(value).trim()?.length > 0) || 'This field is required'
  },
  status: {
    required: 'This field is required'
  },
  image: {
    required: 'This field is required'
  }
});

