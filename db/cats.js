const client = require('./client');
const util = require('util');

const REPLACE_ME = 'HELP REPLACE ME!!!!';

// GET - /api/cats - get all cats
// async function getAllCats() {
//     try {
//         const { rows } = REPLACE_ME;
//         return rows;
//     } catch (error) {
//         throw error;
//     }
// }

// In the './db/cats.js' file, we need to write an async database query to select all entries from the cats table.
async function getAllCats() {
    try {
        const { rows } = await client.query(`
            SELECT * FROM cats;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

// GET - /api/cats/:catId - get cat by id
async function getCatById(catId) {
    try {
        const { rows: [cat] } = await client.query(`
      SELECT * FROM cats
      WHERE id=$1;
    `, [catId]);
        return cat;
    } catch (error) {
        throw error;
    }
}

// POST - /api/cats - create a new cat
async function createCat(body) {
    try {
        const { rows: [cat] } = await client.query(`
        INSERT INTO cats(name, breed, age, weight, owner, checked_in)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `, [body.name, body.breed, body.age, body.weight, body.owner, body.checked_in]);
        return cat;
    } catch (error) {
        throw error;
    }
}


// PUT - /api/cats/:catId - update a cat
async function updateCat(catId, fields = {}) {
    // build the set string
    Object.keys(fields).map((key, index) => {
        console.log( `"${key}"=$${index + 1}`);
        
    });

    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    console.log(typeof(setString))

    // return early if this is called without fields
    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [cat] } = await client.query(`
      UPDATE cats
      SET ${setString}
      WHERE id=${catId}
      RETURNING *;
    `, Object.values(fields));

        return cat;
    } catch (error) {
        throw error;
    }
}

// DELETE - /api/cats/:catId - delete a cat
async function deleteCat(catId) {
    try {
        const { rows: [cat] } = await client.query(`
      DELETE FROM cats
      WHERE id=$1
      RETURNING *;
    `, [catId]);
        return cat;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllCats,
    getCatById,
    createCat,
    updateCat,
    deleteCat
};


