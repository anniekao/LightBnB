const properties = require('./json/properties.json');

// connect to postgresql database
const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});
pool.connect();

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  return new Promise((resolve, reject) => {
    const queryString = 'SELECT * FROM users WHERE email = $1;';
    const values = [email];

    pool
      .query(queryString, values)
      .then(res => {
        let user = res.rows[0];
        if (user.email.toLowerCase() === email.toLowerCase()) {
          resolve(user);
        } else {
          user = null;
          resolve(user);
        }
      })
      .catch(err => reject(err));
  });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  return new Promise((resolve, reject) => {
    const queryStr = 'SELECT * FROM users WHERE id = $1;';
    const values = [id];

    pool
      .query(queryStr, values)
      .then(res => resolve(res.rows[0]))
      .catch(err => reject(err));
  });
};

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {

  return new Promise((resolve, reject) => {
    const queryStr = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;";
    const values = [user.name, user.email, user.password];

    pool
      .query(queryStr, values)
      .then(res => resolve(res.rows[0]))
      .catch(err => reject(err));
  });
  
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  return new Promise((resolve, reject) => {
    const queryStr = `
      SELECT reservations.*, properties.* FROM reservations
      JOIN properties ON reservations.property_id = properties.id
      WHERE guest_id = $1 
      AND start_date > now()::date
      LIMIT $2;
      `;
    const values = [guest_id, limit];

    pool
      .query(queryStr, values)
      .then(res => resolve(res.rows))
      .catch(err => reject(err));
  });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryStr = `
    SELECT properties.*, AVG(property_reviews.rating) as average_rating
    FROM properties 
    JOIN property_reviews ON properties.id = property_id
    `;

    
  // Adding query statements based on values passed into options
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryStr += `WHERE city LIKE $${queryParams.length}`;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryStr += queryParams.length >= 1 ? `AND ` : `WHERE `;
    queryStr += `owner_id = $${queryParams.length}`;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryStr += queryParams.length >= 1 ? `AND ` : `WHERE `;
    queryStr += `cost_per_night >= $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryStr += queryParams.length >= 1 ? `AND ` : `WHERE `;
    queryStr += `cost_per_night <= $${queryParams.length}`;
  }

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryStr += queryParams.length >= 1 ? `AND ` : `WHERE `;
    queryStr += `rating >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryStr += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
  `;

  return new Promise((resolve, reject) => {
    pool
      .query(queryStr, queryParams)
      .then(res => resolve(res.rows))
      .catch(err => reject(err));
  });
 
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);

  return new Promise((resolve, reject) => {
    const queryStr = `
    INSERT INTO properties (
      owner_id, 
      title, 
      description, 
      thumbnail_photo_url, 
      cover_photo_url,
      cost_per_night,
      street,
      city,
      province,
      post_code,
      country,
      parking_spaces,
      number_of_bathrooms,
      number_of_bedrooms
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *;
  `;
    const values = [
      property.owner_id,
      property.title,
      property.description,
      property.thumbnail_photo_url,
      property.cover_photo_url,
      property.cost_per_night,
      property.street,
      property.city,
      property.province,
      property.post_code,
      property.country,
      property.parking_spaces,
      property.number_of_bathrooms,
      property.number_of_bedrooms
    ];

    pool
      .query(queryStr, values)
      .then(res => resolve(res.rows))
      .catch(err => reject(err));
  });
};

exports.addProperty = addProperty;
