const baseUrl = 'https://www.google.com/recaptcha/api/siteverify';

const validateRecaptcha = async (value) => {
  let result = await fetch(`${baseUrl}?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${value}`, {
    method: 'POST',
  });

  result = await result.json();

  return result;
};

export default validateRecaptcha;
