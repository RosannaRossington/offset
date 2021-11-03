//node-postgres module to create a pool of connections.
// don’t have to open a client and close it every time query.
import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();
const connectionString = "postgresql://r.rossington:dbpassword@localhost:5432/offsetdb"

const pool = new Pool({ connectionString }); //establish a connection to our database

export const getMaterials = (request, response) => {
  console.log('getMaterials');
  pool.query('SELECT * FROM materials ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const getMaterialById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    'SELECT * FROM materials WHERE id = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

export const createMaterial = (request, response) => {
  const {
    material_name,
    country,
    water_consumption,
    fossil_fuel,
    global_warming,
    resource_use,
    hides_processed,
  } = request.body;

  pool.query(
    'INSERT INTO materials(material_name,country,water_consumption,fossil_fuel,global_warming,resource_use,hides_processed) VALUES(polyester,China,28BillionLitres,95BillionMegaJoules,ThirtyEightMillionTonnesCo2eq,NULL, NULL)',
    [
      material_name,
      country,
      water_consumption,
      fossil_fuel,
      global_warming,
      resource_use,
      hides_processed,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Material added with ID: ${results.insertId}`);
    }
  );
};


