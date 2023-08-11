const express = require("express");
const notesRouter = express.Router();
const { createNote, deleteNote, getAllNotes, getSingleNote, updateNote } = require('../controllers/notesController')
const { ProtectRoutes, adminCheck } = require('../controllers/authController')

// methods to /api/notes
notesRouter.route("/").get(ProtectRoutes, adminCheck, getAllNotes).post(createNote);
// methods to /api/notes/id
notesRouter.route("/:id").get(getSingleNote).patch(updateNote).delete(deleteNote);
module.exports = notesRouter;
