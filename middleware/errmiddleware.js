const errMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const messageerr = err.messageerr || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    messageerr,
  });
};

export default errMiddleware;
