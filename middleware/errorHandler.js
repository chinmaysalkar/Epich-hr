const errorHandler = (err, req, res, next) => {
  console.log(err);

  res.status(500).send({
    status: false,
    message: "Internal server error...",
    err,
  });
};
module.exports = { errorHandler };
