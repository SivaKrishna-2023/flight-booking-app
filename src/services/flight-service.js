const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const { AppError } = require("../utils/errors/app-error");
const {Op} = require('sequelize')

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    if (data.departureAirportId === data.arrivalAirportId) {
      throw new AppError(
        "Departure and Arrival airports cannot be same",
        StatusCodes.BAD_REQUEST,
      );
    }
    if (new Date(data.departureTime) >= new Date(data.arrivalTime)) {
      throw new AppError(
        "Departure time must be less than arrival time",
        StatusCodes.BAD_REQUEST,
      );
    }
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      let explaination = [];
      console.log(error);
      error.errors.forEach((err) => {
        explaination.push(err.message);
      });
      console.log(explaination);
      throw new AppError(explaination, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new flight object",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter = [];
  const endingTripTime = " 23:59:00"
  // trips=MUM-DEL
  if (query.trips) {
    [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
    // TODO: add a check that they are not same
  }

  if(query.price){
    [minPrice, maxPrice] = query.price.split("-");
    customFilter.price = {
      [Op.between]: [minPrice, ((maxPrice === undefined)? 20000 : maxPrice)]
    }
  }

  if(query.travellers) {
    customFilter.totalSeats = {
      [Op.gte]: query.travellers
    }
  }

  if(query.tripDate) {
    customFilter.departureTime = {
      [Op.between]: [query.tripDate, query.tripDate+endingTripTime]
    }
  }

  if(query.sort){
    const params = query.sort.split(",");
    const sortFilters = params.map((param) => param.split("_"));
    sortFilter = sortFilters
  }


  try {
    const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
    return flights
    
  } catch (error) {
    console.log("Actual error", error)
    throw new AppError(
      "Cannot create a new flight object",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

module.exports = {
  createFlight,
  getAllFlights
};
