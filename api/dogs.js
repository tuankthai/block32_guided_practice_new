const express = require('express');
const router = express.Router();

const { getAllDogs, getDogById, createDog, updateDog, deleteDog } = require('../db/dogs');

// GET - /api/dogs - get all dogs
router.get('/', async (req, res, next) => {
    try{
        const dogs = await getAllDogs();
        res.send(dogs);
    } catch (error) {
        next(error);
    }
});

// GET - /api/dogs/:dogId - get dog by id
router.get('/:dogId', async (req, res, next) => {
    try{
        const dog = await getDogById(req.params.dogId);
        res.send(dog);
    } catch (error) {
        next(error);
    }
});

// POST - /api/dogs - create a new dog
router.post('/', async (req, res, next) => {
    try{
        const dog = await createDog(req.body);
        res.send(dog);
    } catch (error) {
        next(error);
    }
});

// PUT - /api/dogs/:dogId - update a dog
router.put('/:dogId', async (req, res, next) => {
    try{
        const dog = await updateDog(req.params.dogId, req.body);
        res.send(dog);
    } catch (error) {
        next(error);
    }
});

// DELETE - /api/dogs/:dogId - delete a dog
router.delete('/:dogId', async (req, res, next) => {
    try{
        const dog = await deleteDog(req.params.dogId);
        res.send(dog);
    } catch (error) {
        next(error);
    }
});

module.exports = router;