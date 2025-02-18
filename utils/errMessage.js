export const errHandler = (statusCode, errmessage) => {
  const err = new Error();
  err.statuscode = statusCode;
  err.message = errmessage;
  return err;
};
