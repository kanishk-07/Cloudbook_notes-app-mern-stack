const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create a User using POST request

router.post('/', (req, res)=>{
    console.log(req.body);
    const user = User(req.body);
    user.save()
    res.send("Created");
});

// router.get('/', (req, res)=>{
//     obj = {
//         a: "PKMKB"
//     }
//     res.json(obj)
// })

module.exports = router