const emailPassValidate = (email, password) => {
  if (email === undefined) return { code: 400, message: '"email" is required' };
  if (email === '') return { code: 400, message: '"email" is not allowed to be empty' };
  if (password === undefined) return { code: 400, message: '"password" is required' };
  if (password === '') return { code: 400, message: '"password" is not allowed to be empty' };
  return { code: undefined, message: undefined };
};

module.exports = {
  emailPassValidate,
};
