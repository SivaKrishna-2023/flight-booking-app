const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const { AppError } = require("../utils/errors/app-error");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const city = await cityRepository.create(data);
    return city;
  } catch (error) {
    console.log(error);
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      let explaination = [];
      error.errors.forEach((err) => {
        explaination.push(err.message);
      });
      console.log(explaination);
      throw new AppError(explaination, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new city object",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function getCities() {
  try {
    const cities = await cityRepository.getAllCities();
    return cities;
  } catch (error) {
    throw new AppError(
      "Cannot fetch data of all the cities",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getCity(id) {
  try {
    const city = await cityRepository.get(id);
    return city;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The city you requested is not present",
        error.statusCode,
      );
    }
    throw new AppError(
      "Cannot fetch data of the all the cities",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function destroyCity(id) {
  try {
    const response = await cityRepository.destroy(id);
    console.log(response);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The city you requested to delete is not present",
        error.statusCode,
      );
    }
    throw new AppError(
      "Cannot fetch data of the all the cities",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function updateCity(id, data) {
  try {
    const response = await cityRepository.update(id, data);
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The city you requested to update is not present",
        error.statusCode,
      );
    }

    throw new AppError("Cannot update city", StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
  createCity,
  getCities,
  getCity,
  destroyCity,
  updateCity,
};
