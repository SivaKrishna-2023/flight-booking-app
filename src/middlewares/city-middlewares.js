const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  const errors = [];

  if (!req.body?.name) {
    errors.push("City name not found in the incoming request");
  }

  if (!req.body?.country) {
    errors.push("Country not found in the incoming request");
  }

  if (errors.length > 0) {
    ErrorResponse.message = "Something went wrong while creating city";
    ErrorResponse.error = new AppError(errors, StatusCodes.BAD_REQUEST);

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

function validateUpdateRequest(req, res, next) {
  const errors = [];

  if (req.body.name !== undefined && req.body.name.trim() === "") {
    errors.push("City name cannot be empty");
  }

  if (req.body.country !== undefined && req.body.country.trim() === "") {
    errors.push("Country cannot be empty");
  }

  if (errors.length > 0) {
    ErrorResponse.message = "Something went wrong while updating city";
    ErrorResponse.error = new AppError(errors, StatusCodes.BAD_REQUEST);

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateCreateRequest,
  validateUpdateRequest,
};
