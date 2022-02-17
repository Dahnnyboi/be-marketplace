export const REGEX = {
  // at least 8 characters must contain. at least 1 uppercase letter, 1 lowercase letter, and 1 number and can contain special characters
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
};

export const FEEDBACK = {
  validEmail: 'Provide a valid email',
  takenEmail: 'Email is already taken',
  password:
    'Password should have 8 characters also must contain atleast 1 uppercase, 1 lowercase and 1 number',
  required: (name: string) => `${name} is required`,
  onlyValidType: (name: string, types: string[]): string => {
    const newTypes = types.slice().filter((v) => v);
    if (newTypes.length > 1) {
      if (newTypes.length === 2) {
        return `${name} should only be ${newTypes.join(' and ')}`;
      }
      newTypes[newTypes.length - 1] = 'and '.concat(
        newTypes[newTypes.length - 1],
      );
    }
    const result = newTypes.join(', ');

    return `${name} should only be ${result}`;
  },
};
