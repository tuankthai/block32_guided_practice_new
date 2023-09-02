const client = require('./client');

// remove all tables if they already exist
async function dropTables() {
    try {
        console.log('Dropping All Tables...');
        await client.query(`
      DROP TABLE IF EXISTS dogs;
      DROP TABLE IF EXISTS cats;
    `);
    } catch (error) {
        throw error;
    }
}

// build all tables
async function createTables() {
    try {
        console.log('Building All Tables...');
        await client.query(`
        CREATE TABLE dogs(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            breed VARCHAR(255) NOT NULL,
            age INTEGER NOT NULL,
            weight INTEGER NOT NULL,
            owner VARCHAR(255) NOT NULL,
            checked_in BOOLEAN DEFAULT false
        );
        CREATE TABLE cats(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            breed VARCHAR(255) NOT NULL,
            age INTEGER NOT NULL,
            weight INTEGER NOT NULL,
            owner VARCHAR(255) NOT NULL,
            checked_in BOOLEAN DEFAULT false
        );
    `);
    } catch (error) {
        throw error;
    }
}

// create initial appointments
async function createInitialAppointments() {
    try {
        console.log('Creating Initial Appointments...');
        await client.query(`
        INSERT INTO dogs(name, breed, age, weight, owner, checked_in)
        VALUES('Fido', 'Labrador', 3, 60, 'John Smith', false);
        INSERT INTO dogs(name, breed, age, weight, owner, checked_in)
        VALUES('Spot', 'Poodle', 5, 40, 'Jane Doe', false);
        INSERT INTO dogs(name, breed, age, weight, owner, checked_in)
        VALUES('Rover', 'Golden Retriever', 2, 50, 'John Smith', false);
        INSERT INTO dogs(name, breed, age, weight, owner, checked_in)
        VALUES('Lassie', 'Collie', 7, 45, 'Jane Doe', false);
        INSERT INTO dogs(name, breed, age, weight, owner, checked_in)
        VALUES('Snoopy', 'Beagle', 4, 35, 'John Smith', false);
        INSERT INTO dogs(name, breed, age, weight, owner, checked_in)
        VALUES('Lady', 'German Shepherd', 6, 55, 'Jane Doe', false);`);
        await client.query(`
        INSERT INTO cats(name, breed, age, weight, owner, checked_in)
        VALUES('Fluffy', 'Domestic Shorthair', 3, 10, 'John Smith', false);
        INSERT INTO cats(name, breed, age, weight, owner, checked_in)
        VALUES('Garfield', 'Domestic Shorthair', 5, 12, 'Jane Doe', false);
        INSERT INTO cats(name, breed, age, weight, owner, checked_in)
        VALUES('Sylvester', 'Domestic Shorthair', 2, 8, 'John Smith', false);
        INSERT INTO cats(name, breed, age, weight, owner, checked_in)
        VALUES('Tom', 'Domestic Shorthair', 7, 11, 'Jane Doe', false);
        INSERT INTO cats(name, breed, age, weight, owner, checked_in)
        VALUES('Cheshire Cat', 'Domestic Shorthair', 4, 9, 'John Smith', false);`);
    } catch (error) {
        throw error;
    }
}

// drop tables, create tables, create initial appointments
async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialAppointments();
    } catch (error) {
        throw error;
    }
}

// export functions
module.exports = {
    rebuildDB,
};
