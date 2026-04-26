const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { get } = require("../routes/v1");

async function createCity(req, res) {
  try {
    const city = await CityService.createCity({
      name: req.body.name,
      country: req.body.country,
      status: req.body.status,
    });
    SuccessResponse.data = city;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function getCities(req, res) {
  try {
    const cities = await CityService.getCities();
    SuccessResponse.data = cities;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function getCity(req, res) {
  try {
    const city = await CityService.getCity(req.params.id);
    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function destroyCity(req, res) {
  try {
    console.log(req.params.id);
    const cities = await CityService.destroyCity(req.params.id);
    console.log(cities);
    SuccessResponse.data = cities;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function updateCity(req, res) {
  try {
    const city = await CityService.updateCity(req.params.id, {
      name: req.body.name,
       country: req.body.country,
      status: req.body.status,
    });

    SuccessResponse.data = city;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;

    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

module.exports = {
  createCity,
  getCities,
  getCity,
  destroyCity,
  updateCity,
};
