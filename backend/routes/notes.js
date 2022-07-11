const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
var fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

/* /api/notes */

// Fetch all notes of the user LoggedIn ***********************************
router.get('/fetchallnotes', fetchUser, async (req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        return res.status(500).send("Some error occurred, Please try again");
    }
});


// Add a note of the user LoggedIn ***********************************
router.post('/addnote', fetchUser, [
    body('title', 'Title length should be 3 atleast').isLength({ min: 3 }),
	body('description', 'Description length should be 3 atleast').isLength({ min: 5 })
], async (req, res)=>{
    const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
    try {
        const {title, description, tag} = req.body;
        const note = new Note({title, description, tag, user: req.user.id});
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Some error occurred, Please try again");
    }
});


// Update a note of the user LoggedIn ***********************************
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Note Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorised");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Delete a note of the loggedIn User
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Note Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorised");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router