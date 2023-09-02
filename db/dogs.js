const client = require('./client');
const util = require('util');

// GET - /api/dogs - get all dogs
async function getAllDogs() {
    try{
        const { rows } = await client.query(`
        SELECT * FROM dogs;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

// GET - /api/dogs/:dogId - get dog by id
async function getDogById(dogId) {
    try{
        const { rows: [dog] } = await client.query(`
        SELECT * FROM dogs
        WHERE id=$1;
        `, [dogId]);
        return dog;
    } catch (error) {
        throw error;
    }
}

// POST - /api/dogs - create a new dog
async function createDog(body) {
    try{
        const { rows: [dog] } = await client.query(`
        INSERT INTO dogs(name, breed, age, weight, owner, checked_in)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `, [body.name, body.breed, body.age, body.weight, body.owner, body.checked_in]);
        return dog;
    } catch (error) {
        throw error;
    }
}

// PUT - /api/dogs/:dogId - update a dog
async function updateDog(dogId, fields = {}) {
    // build the set string
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');

    // return early if this is called without fields
    if (setString.length === 0) {
        return;
    }

    try{
        const { rows: [dog] } = await client.query(`
        UPDATE dogs
        SET ${setString}
        WHERE id=${dogId}
        RETURNING *;
        `, Object.values(fields));
        return dog;
    } catch (error) {
        throw error;
    }
}

// DELETE - /api/dogs/:dogId - delete a dog
async function deleteDog(dogId) {
    try{
        const { rows: [dog] } = await client.query(`
        DELETE FROM dogs
        WHERE id=$1
        RETURNING *;
        `, [dogId]);
        return dog;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllDogs,
    getDogById,
    createDog,
    updateDog,
    deleteDog
}
