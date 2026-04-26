const CrudRepository = require("./crud-repository");
const { City, Airport, sequelize } = require("../models");

class CityRepository extends CrudRepository {
  constructor() {
    super(City);
  }

  async getAllCities() {
    const response = await City.findAll({
      include: [
        {
          model: Airport,
          as: "airportsList",
          attributes: [],
          required: false,
        },
      ],
      attributes: {
        include: [
          [
            sequelize.fn("COUNT", sequelize.col("airportsList.id")),
            "airports",
          ],
        ],
      },
      group: ["City.id"],
    });

    return response;
  }
}

module.exports = CityRepository;