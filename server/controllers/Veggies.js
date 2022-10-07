const router = require('express').Router();
const { Request, User, Veggie }=require('../models')

router.get('/:id', async (req, res) => {
    try {
        const dbAnimalData = await Animal.findByPk(req.params.id);
        if (!dbVeggieData) {
            res.status(404).json({message: "No veggies found"});
            return;
        }
        const cleanVeggie = dbVeggieData.get({plain: true});
        res.json(cleanVeggie);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;