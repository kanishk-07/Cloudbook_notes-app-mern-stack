const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    obj = {
        b: "PKMKB"
    }
    res.json(obj)
})

module.exports = router