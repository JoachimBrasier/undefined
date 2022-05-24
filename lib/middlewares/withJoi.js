const withJoi = (handler, schema) => {
  return async (req, res) => {
    const { error, value } = schema.validate(req.body ?? {}, {
      abortEarly: false, // Don't stop at first error
    });

    if (error) {
      return res.status(400).json(error);
    }

    return handler(req, res);
  };
};

export default withJoi;
