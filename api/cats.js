const express = require('express');
const router = express.Router();

const REPLACE_ME = 'HELP REPLACE ME!!!!';

const { getAllCats, getCatById, createCat, updateCat, deleteCat } = require('../db');




// GET - /api/cats - get all cats
// router.get('/', async (req, res, next) => {
//     try {
//         const cats = await getAllCats();
//         console.log(cats);
//         res.send(REPLACE_ME);
//     } catch (error) {
//         next(error);
//     }
// });

// In the './api/cats.js' file, we need to call the getAllCats function and await the response.
router.get('/', async (req, res, next) => {
    try {
        const cats = await getAllCats();
        res.send(cats);
    } catch (error) {
        next(error);
    }
});


// GET - /api/cats/:catId - get cat by id
router.get('/:catId', async (req, res, next) => {
    try {
        const cat = await getCatById(req.params.catId);
        res.send(cat);
    } catch (error) {
        next(error);
    }
});

// POST - /api/cats - create a new cat
router.post('/', async (req, res, next) => {
    try {
        const cat = await createCat(req.body);
        res.send(cat);
    } catch (error) {
        next(error);
    }
});

// PUT - /api/cats/:catId - update a cat
router.put('/:catId', async (req, res, next) => {
    try {
        const cat = await updateCat(req.params.catId, req.body);
        res.send(cat);
    } catch (error) {
        next(error);
    }
});

// DELETE - /api/cats/:catId - delete a cat
router.delete('/:catId', async (req, res, next) => {
    try {
        const cat = await deleteCat(req.params.catId);
        res.send(cat);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
