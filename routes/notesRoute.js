const express = require("express");
const notesRouter = express.Router();
const { createNote, deleteNote, getAllNotes, getSingleNote, updateNote , restrictId} = require('../controllers/notesController')

notesRouter.param('id', restrictId)

// methods to /api/notes
notesRouter.route("/").get(getAllNotes).post(createNote);
// methods to /api/notes/id
notesRouter.route("/:id").get(getSingleNote).patch(updateNote).delete(deleteNote);
module.exports = notesRouter;