const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors/app-error");

function validateCreateRequest(req, res, next) {
  if (!req.body.flightNumber) {
    ErrorResponse.message = "something went wrong while creating flight";
    ErrorResponse.error = new AppError(
      ["flightNumber not found in the incomming request in the current form"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.airplaneId) {
    ErrorResponse.message = "something went wrong while creating flight";
    ErrorResponse.error = new AppError(
      ["airplaneId not found in the incomming request in the current form"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.departureAirportId) {
    ErrorResponse.message = "something went wrong while creating flight";
    ErrorResponse.error = new AppError(
      [
        "departureAirportId id not found in the incomming request in the current form",
      ],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.arrivalAirportId) {
    ErrorResponse.message = "something went wrong while creating flight";
    ErrorResponse.error = new AppError(
      [
        "arrivalAirportId id not found in the incomming request in the current form",
      ],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.arrivalTime) {
    ErrorResponse.message = "something went wrong while creating flight";
    ErrorResponse.error = new AppError(
      ["arrivalTime id not found in the incomming request in the current form"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.departureTime) {
    ErrorResponse.message = "something went wrong while creating flight";
    ErrorResponse.error = new AppError(
      [
        "departureTime id not found in the incomming request in the current form",
      ],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.price) {
    ErrorResponse.message = "something went wrong while creating flight";
    ErrorResponse.error = new AppError(
      ["price id not found in the incomming request in the current form"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.totalSeats) {
    ErrorResponse.message = "something went wrong while creating flight";
    ErrorResponse.error = new AppError(
      ["totalSeats id not found in the incomming request in the current form"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = { validateCreateRequest };
